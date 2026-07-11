import React from 'react';
import { ReceiptText } from 'lucide-react';

const Billing = ({ subtotal, tax, deliveryFee, discount, total }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4 border-b pb-4">
        <ReceiptText className="text-indigo-600" size={20} />
        <h2 className="text-lg font-bold text-slate-900">Billing Details</h2>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3 mt-3 flex justify-between items-center">
          <span className="text-base font-bold text-slate-900">Grand Total</span>
          <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Billing;