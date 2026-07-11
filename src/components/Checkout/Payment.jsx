import React from 'react';
import { CreditCard, Wallet, Smartphone, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Payment = ({ paymentMethod, setPaymentMethod, paymentDetails, setPaymentDetails }) => {
  const methods = [
    { id: 'Cash on Delivery', icon: <Banknote size={18} /> },
    { id: 'Credit Card', icon: <CreditCard size={18} /> },
    { id: 'EasyPaisa', icon: <Smartphone size={18} /> },
    { id: 'JazzCash', icon: <Wallet size={18} /> }
  ];

  const handleDetailChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-4">Payment Method</h2>
      
      <div className="space-y-3 mb-6">
        {methods.map((method) => (
          <label 
            key={method.id} 
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              paymentMethod === method.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <input 
              type="radio" 
              name="paymentMethod" 
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className={`${paymentMethod === method.id ? 'text-indigo-700' : 'text-slate-600'}`}>
              {method.icon}
            </span>
            <span className="font-medium text-slate-800">{method.id}</span>
          </label>
        ))}
      </div>

      {/* Conditional Rendering for Payment Details */}
      <AnimatePresence mode="wait">
        {paymentMethod === 'Credit Card' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
              <input type="text" name="cardNumber" value={paymentDetails.cardNumber || ''} onChange={handleDetailChange} placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <input type="text" name="expiry" value={paymentDetails.expiry || ''} onChange={handleDetailChange} placeholder="MM/YY" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                <input type="text" name="cvv" value={paymentDetails.cvv || ''} onChange={handleDetailChange} placeholder="123" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
              </div>
            </div>
          </motion.div>
        )}

        {(paymentMethod === 'EasyPaisa' || paymentMethod === 'JazzCash') && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <label className="block text-sm font-medium text-slate-700 mb-1">Registered Phone Number</label>
            <input type="tel" name="mobileAccountPhone" value={paymentDetails.mobileAccountPhone || ''} onChange={handleDetailChange} placeholder="03XX XXXXXXX" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;