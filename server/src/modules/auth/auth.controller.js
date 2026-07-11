const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../../config/env');
const apiResponse = require('../../utils/apiResponse');
const sendEmail = require('../../utils/sendEmail');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 */
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return apiResponse(res, 400, 'User already exists with this email.');
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        return apiResponse(res, 201, 'User registered successfully', { 
            userId: user._id 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return apiResponse(res, 401, 'Invalid email or password');
        }

        // 2. Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return apiResponse(res, 401, 'Invalid email or password');
        }

        // 3. Create Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return apiResponse(res, 200, 'Login successful', {
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Generate Reset Password Token and send email
 * @route   POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return apiResponse(res, 404, 'There is no user with that email.');
        }

        // 1. Generate random reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // 2. Hash and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // 3. Set expiry (10 minutes)
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        // 4. Send Email
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password to:\n\n${resetUrl}\n\nIf you didn't forget your password, please ignore this email!`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset token (valid for 10 min)',
                message,
            });

            return apiResponse(res, 200, 'Token sent to email!');
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return apiResponse(res, 500, 'There was an error sending the email. Try again later.');
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Reset password using token
 * @route   PATCH /api/auth/reset-password/:token
 */
exports.resetPassword = async (req, res, next) => {
    try {
        // 1. Get hashed token from params
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        // 2. Find user by hashed token and check if expiry is in the future
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return apiResponse(res, 400, 'Token is invalid or has expired.');
        }

        // 3. Update password and clear reset fields
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        // 4. Log user in (optional: send new token)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return apiResponse(res, 200, 'Password updated successfully.', { token });
    } catch (error) {
        next(error);
    }
};