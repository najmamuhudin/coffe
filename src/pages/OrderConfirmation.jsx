import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    const [orderNumber, setOrderNumber] = useState("");

    useEffect(() => {
        // Generate a random order number
        const randomOrder = Math.floor(10000 + Math.random() * 90000);
        setOrderNumber(`#${randomOrder}`);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-[80vh] bg-[#fbfaf8] dark:bg-[#1a0f0a] px-6 py-16 flex justify-center items-center transition-colors duration-300">
            <div className="w-full max-w-lg bg-white dark:bg-[#2c1810] rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-500">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-4 tracking-tight">
                    Order Confirmed!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 font-medium mb-10 max-w-sm leading-relaxed">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>

                <div className="space-y-2 mb-10">
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                        An email confirmation has been sent to your email address.
                    </p>
                    <p className="text-sm font-bold text-[#2c1810] dark:text-[#f0e9e2]">
                        Your order number is: <span className="text-[#8B5E3C]">{orderNumber || "#12345"}</span>
                    </p>
                </div>

                <Link
                    to="/"
                    className="w-full bg-[#8B5E3C] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#7a5234] transition shadow-xl hover:-translate-y-1 active:translate-y-0 duration-200"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
