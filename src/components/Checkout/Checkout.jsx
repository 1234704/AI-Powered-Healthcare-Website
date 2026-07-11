import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import OrderSummary from './OrderSummary';
import Billing from './Billing';
import Payment from './Payment';

const Checkout = () => {
  // Day 1: State Management
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});
  
  // Day 5 & 7: Validation and Error State
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiStatus, setApiStatus] = useState({ loading: false, error: null, success: false });

  // Mock Cart Data
  const cartItems = [
    { name: 'Doctor Appointment', price: 30.00 },
    { name: 'Medicine', price: 20.00 },
    { name: 'Lab Test', price: 50.00 }
  ];

  // Day 2: Billing Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.10;
  const deliveryFee = 5.00;
  const total = subtotal + tax + deliveryFee;

  // Day 5: Real-time Validation Engine
  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!customerInfo.name.trim()) newErrors.name = "Name is required";
      if (!customerInfo.email) newErrors.email = "Email is required";
      else if (!emailRegex.test(customerInfo.email)) newErrors.email = "Invalid Email";
      if (!customerInfo.phone) newErrors.phone = "Phone is required";
      if (!customerInfo.address) newErrors.address = "Address is required";
      if (!paymentMethod) newErrors.payment = "Please select payment method";
      
      if (paymentMethod === 'Credit Card') {
        if (!paymentDetails.cardNumber) newErrors.paymentDetails = "Card number required";
      } else if (paymentMethod === 'EasyPaisa' || paymentMethod === 'JazzCash') {
        if (!paymentDetails.mobileAccountPhone) newErrors.paymentDetails = "Account phone required";
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };
    validate();
  }, [customerInfo, paymentMethod, paymentDetails]);

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // Day 7: Error Handling & Form Submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isFormValid || cartItems.length === 0) {
      if (cartItems.length === 0) setApiStatus({ loading: false, error: "Empty Cart. Unable to place order.", success: false });
      return;
    }

    setApiStatus({ loading: true, error: null, success: false });

    // Simulating Backend API Integration latency and random error handling
    setTimeout(() => {
      const randomOutcome = Math.random();
      if (randomOutcome > 0.8) {
        setApiStatus({ loading: false, error: "Network Error. Please try again.", success: false });
      } else if (randomOutcome > 0.6) {
        setApiStatus({ loading: false, error: "Payment Failed. Check your payment details.", success: false });
      } else {
        setApiStatus({ loading: false, error: null, success: true });
      }
    }, 1500);
  };

  if (apiStatus.success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-slate-600">Your order has been successfully placed. We will send you a confirmation email shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-10">Checkout</h1>

        {/* Day 7: Global Error Message UI */}
        <AnimatePresence>
          {apiStatus.error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span className="font-medium">{apiStatus.error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Day 6: Responsive Grid Design (1 col mobile, 2 col desktop) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form & Payment */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-4">Customer Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'}`} />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'}`} />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input type="tel" name="phone" value={customerInfo.phone} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'}`} />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                    <textarea name="address" rows="3" value={customerInfo.address} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none ${errors.address ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}></textarea>
                  </div>
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
              </form>
            </div>

            <Payment 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod}
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
            />
            {errors.payment && <p className="text-sm text-red-500 font-medium -mt-4">{errors.payment}</p>}
          </div>

          {/* Right Column: Order Summary, Billing, and Submit */}
          <div className="lg:w-[400px]">
            <div className="sticky top-24">
              <OrderSummary cartItems={cartItems} />
              <Billing subtotal={subtotal} tax={tax} deliveryFee={deliveryFee} discount={0} total={total} />
              
              <button 
                onClick={handlePlaceOrder}
                disabled={!isFormValid || apiStatus.loading}
                className="w-full mt-6 py-4 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg transition-colors flex justify-center items-center gap-2"
              >
                {apiStatus.loading ? (
                  <span className="animate-pulse">Processing Order...</span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;