// _components/Cart/CartItem.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { CartItem as CartItemType } from '../../_components/CartContext/CartContext'; // Use type from context

interface CartItemProps {
    item: CartItemType; // Uses type with number id
    updateQuantity: (id: number, quantity: number) => void; // number id
    removeItem: (id: number) => void; // number id
    stock?: number;
}

const CartItem = ({ item, updateQuantity, removeItem, stock }: CartItemProps) => {

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        let validatedQuantity = Math.max(1, isNaN(newQuantity) ? 1 : newQuantity);
        if (stock !== undefined && validatedQuantity > stock) {
            validatedQuantity = stock;
        }
        updateQuantity(item.id, validatedQuantity);
    };

    const increment = () => {
        if (stock === undefined || item.quantity < stock) {
           updateQuantity(item.id, item.quantity + 1);
        }
    };
    const decrement = () => updateQuantity(item.id, item.quantity - 1);

    const canIncrement = stock === undefined || item.quantity < stock;

    return (
        <div className="grid grid-cols-12 gap-4 items-center p-4 border-b last:border-b-0">
            {/* Product Info */}
            <div className="col-span-12 sm:col-span-5 flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gray-100 rounded overflow-hidden border">
                    {item.image ? (
                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                </div>
                <div>
                    {/* Standard Link */}
                    <Link href={`/shop/${item.id}`} className="text-sm sm:text-base font-medium text-gray-800 hover:text-green-600 line-clamp-2">
                        {item.name}
                    </Link>
                    {/* Mobile Price & Remove */}
                    <p className="sm:hidden text-sm text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="sm:hidden text-red-500 hover:text-red-700 text-xs mt-1">Remove</button>
                </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden sm:block col-span-2 text-center text-sm text-gray-700">${item.price.toFixed(2)}</div>

            {/* Quantity Control */}
            <div className="col-span-6 sm:col-span-2 flex justify-center items-center">
                <div className="flex items-center border border-gray-300 rounded">
                    <button
                        onClick={decrement}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                    >−</button>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={stock}
                        className="w-10 text-center py-1 border-x border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-label="Item quantity"
                    />
                    <button
                        onClick={increment}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!canIncrement}
                        aria-label="Increase quantity"
                    >+</button>
                </div>
            </div>

            {/* Desktop Subtotal */}
            <div className="hidden sm:block col-span-2 text-right font-medium text-gray-800 text-sm">${(item.price * item.quantity).toFixed(2)}</div>

            {/* Desktop Remove Button */}
            <div className="col-span-6 sm:col-span-1 flex justify-end sm:justify-center">
                <button
                    onClick={() => removeItem(item.id)}
                    className="hidden sm:inline-flex text-gray-400 hover:text-red-600 p-1"
                    aria-label="Remove item"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;