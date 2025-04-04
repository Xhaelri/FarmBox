"use client"
import React, { useState } from 'react';
import { useCart } from '../CartContext/CartContext'; // Check path
import CartItem from './CartItem';
import Link from 'next/link';
import { ArrowUturnLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function ShoppingCart() {
  const {
      cart, updateQuantity, removeFromCart, getCartTotal, clearCart, getCartItemCount
    } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartTotal();
  const itemCount = getCartItemCount();

  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.00;
  const discountAmount = couponApplied && couponCode.toUpperCase() === 'DISCOUNT10' ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
      e.preventDefault();
      setCouponError('');
      if (couponCode.toUpperCase() === 'DISCOUNT10') {
          setCouponApplied(true);
      } else if (couponCode.trim() === '') {
           setCouponError('Please enter a coupon code.');
           setCouponApplied(false);
      } else {
          setCouponError('Invalid coupon code.');
          setCouponApplied(false);
      }
  };

  const handleClearCart = () => {
      if (cart.length > 0 && window.confirm('Are you sure you want to empty your cart?')) {
          clearCart();
          setCouponApplied(false);
          setCouponCode('');
          setCouponError('');
      }
  }

  const handleProceedToCheckout = () => {
      console.log("Proceeding to checkout...");
      alert("Redirecting to checkout (implementation needed).");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
          Shopping Cart
      </h1>

      {cart.length === 0 ? (
          // Empty Cart View
          <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-6">Looks like you havent added anything yet.</p>
              {/* Standard Link */}
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                  Return to Shop
              </Link>
          </div>
      ) : (
          // Cart View
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Cart Items List */}
              <div className="flex-grow lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      {/* Header Row */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 items-center p-4 border-b bg-gray-50 text-xs text-gray-500 uppercase font-medium tracking-wider">
                          <div className="col-span-5">Product</div>
                          <div className="col-span-2 text-center">Price</div>
                          <div className="col-span-2 text-center">Quantity</div>
                          <div className="col-span-2 text-right">Subtotal</div>
                          <div className="col-span-1 text-center">Remove</div>
                      </div>

                      {/* Cart Item Rows */}
                      <div>
                          {cart.map((item) => (
                              <CartItem
                                  key={item.id} // Use number ID
                                  item={item}
                                  updateQuantity={updateQuantity}
                                  removeItem={removeFromCart}
                                  // You might need to fetch stock data here or pass it if available
                              />
                          ))}
                      </div>
                  </div>

                 {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                      {/* Standard Link */}
                      <Link href="/shop" className="inline-flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          <ArrowUturnLeftIcon className="h-4 w-4" />
                          Continue Shopping
                      </Link>
                      <button
                          onClick={handleClearCart}
                          className="px-5 py-2 border border-red-200 bg-red-50 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={cart.length === 0}
                      >
                          Clear Cart
                      </button>
                  </div>

                  {/* Coupon Section */}
                  <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700">Apply Coupon Code</h3>
                      <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-3">
                          <input
                              type="text"
                              placeholder="Enter Coupon Code"
                              className={`px-4 py-2 border rounded-md flex-grow text-sm focus:outline-none focus:ring-2 ${couponError ? 'border-red-400 ring-red-300' : 'border-gray-300 focus:border-green-500 focus:ring-green-300'}`}
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              disabled={couponApplied} // Disable input if applied
                          />
                          <button
                              type="submit"
                              className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                              disabled={couponApplied || !couponCode.trim()}
                          >
                              {couponApplied ? 'Applied!' : 'Apply Coupon'}
                          </button>
                      </form>
                      {couponError && <p className="text-red-600 text-xs mt-2">{couponError}</p>}
                      {couponApplied && !couponError && <p className="text-green-600 text-xs mt-2">Coupon {couponCode.toUpperCase()} applied successfully!</p>}
                  </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-6">
                      <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-3">Order Summary</h2>
                      <div className="space-y-3 mb-5 text-sm">
                          <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal ({itemCount} items):</span>
                              <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                          </div>
                          {couponApplied && (
                             <div className="flex justify-between text-green-600">
                                 <span>Discount ({couponCode.toUpperCase()}):</span>
                                 <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                             </div>
                           )}
                          <div className="flex justify-between">
                              <span className="text-gray-600">Shipping:</span>
                              <span className="font-medium text-gray-800">
                                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                              </span>
                          </div>
                      </div>
                      <div className="flex justify-between items-baseline mb-6 pt-4 border-t border-gray-200">
                          <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                      </div>
                      <button
                           onClick={handleProceedToCheckout}
                           className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                           disabled={cart.length === 0}
                      >
                          Proceed to Checkout
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}