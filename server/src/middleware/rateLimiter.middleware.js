const rateLimit = require('express-rate-limit');

// 1. General API Limiter: Prevents basic DDoS/abuse
exports.globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes."
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

// 2. Auth Limiter: Stricter limits to prevent Brute-Force on Login/Signup
exports.authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 login/signup attempts per hour
    message: {
        success: false,
        message: "Too many authentication attempts. Please try again in an hour."
    }
});

// 3. AI Limiter: AI processing is expensive, limit usage strictly
exports.aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 AI queries per hour
    message: {
        success: false,
        message: "AI daily limit reached for your IP. Please try again later."
    }
});