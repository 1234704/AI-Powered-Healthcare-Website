import React from 'react';
import { ShoppingBag } from 'lucide-react';

const OrderSummary = ({ cartItems }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <div className="flex items-center gap-2 mb-4 border-b pb-4">
        <ShoppingBag className="text-indigo-600" size={20} />
        <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
      </div>
      
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-slate-500 text-sm">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-slate-700 font-medium">{item.name}</span>
              <span className="text-slate-900 font-semibold">${item.price.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderSummary;