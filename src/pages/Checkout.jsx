import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart.length === 0) {
            navigate('/cart');
        }
        setCartItems(cart);
    }, [navigate]);

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate payment process completion
        localStorage.removeItem("cart");
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'checkout' } }));
        navigate('/order-confirmation');
    };

    return (
        <div className="w-full min-h-screen bg-[#fbfaf8] dark:bg-[#1a0f0a] px-6 py-16 flex justify-center items-start transition-colors duration-300">
            <div className="w-full max-w-6xl mt-12">
                <h1 className="text-4xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-12 tracking-tight">
                    Checkout
                </h1>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Left Column: Forms */}
                    <div className="flex-1 w-full space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white dark:bg-[#2c1810] rounded-xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-8 flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5E3C]">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                Shipping Information
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-[#2c1810] rounded-xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-8 flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5E3C]">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                </svg>
                                Payment Method
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'credit-card'}
                                            onChange={() => setPaymentMethod('credit-card')}
                                            className="w-4 h-4 accent-[#8B5E3C]"
                                        />
                                        <span className="text-sm font-bold text-[#2c1810] dark:text-gray-300 group-hover:text-[#8B5E3C] transition-colors">Credit Card</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            className="w-4 h-4 accent-[#8B5E3C]"
                                        />
                                        <span className="text-sm font-bold text-[#2c1810] dark:text-gray-300 group-hover:text-[#8B5E3C] transition-colors">PayPal</span>
                                    </label>
                                </div>

                                {paymentMethod === 'credit-card' && (
                                    <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
                                        <div>
                                            <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-[#2c1810] dark:text-gray-300 mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    placeholder="123"
                                                    className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-[#8B5E3C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#7a5234] transition shadow-lg hover:shadow-[#8B5E3C]/20 hover:-translate-y-0.5 duration-200 active:translate-y-0"
                                >
                                    Pay ${calculateTotal()}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-white dark:bg-[#2c1810] rounded-xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800 sticky top-28">
                            <h2 className="text-xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                                            {item.name} <span className="text-gray-400 text-xs">x {item.quantity || 1}</span>
                                        </div>
                                        <div className="text-[#2c1810] dark:text-white font-bold">
                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-base font-bold text-[#2c1810] dark:text-white">Total</span>
                                <span className="text-2xl font-black text-[#8B5E3C]">${calculateTotal()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
