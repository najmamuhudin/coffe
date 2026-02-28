import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteReason, setDeleteReason] = useState("");
    const navigate = useNavigate();

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('storage', loadCart);
        window.addEventListener('cartUpdated', loadCart);
        return () => {
            window.removeEventListener('storage', loadCart);
            window.removeEventListener('cartUpdated', loadCart);
        };
    }, []);

    const updateQuantity = (id, delta) => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = cart.findIndex(i => i.id === id);

        if (itemIndex > -1) {
            const newQuantity = (cart[itemIndex].quantity || 1) + delta;
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                // If quantity reaches 0, trigger the delete confirmation
                openDeleteModal(cart[itemIndex]);
                return;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'added' } }));
        }
    };

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
        setDeleteReason("");
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart = cart.filter(i => i.id !== itemToDelete.id);

        // Log the reason (simulating sending to server/analytics)
        console.log(`Item ${itemToDelete.name} deleted. Reason: ${deleteReason}`);

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'deleted' } }));

        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const removeItem = (id) => {
        const item = cartItems.find(i => i.id === id);
        if (item) openDeleteModal(item);
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-[70vh] bg-[#fbfaf8] dark:bg-[#1a0f0a] px-6 py-16 flex justify-center items-start transition-colors duration-300">
                <div className="w-full max-w-4xl mt-12">
                    <h1 className="text-4xl md:text-[40px] font-black text-[#3a2a22] dark:text-[#f0e9e2] mb-12 tracking-tight">
                        Your Cart
                    </h1>
                    <div className="bg-white dark:bg-[#2c1810] border border-gray-100 dark:border-gray-800 rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.02)] py-16 px-6 flex flex-col items-center justify-center min-h-[280px]">
                        <p className="text-[20px] text-gray-600 dark:text-gray-300 mb-8 font-medium">
                            Your cart is empty
                        </p>
                        <button
                            onClick={() => navigate('/special-coffee')}
                            className="bg-[#9c5a2c] hover:bg-[#834b24] text-white px-8 py-3.5 rounded-lg font-bold text-[15px] transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#fbfaf8] dark:bg-[#1a0f0a] px-6 py-16 flex justify-center items-start transition-colors duration-300 relative">

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowDeleteModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white dark:bg-[#2c1810] rounded-[2rem] shadow-2xl p-8 border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-2 tracking-tight">
                                Wait! Are you sure?
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                We're sad to see this item go. Could you tell us why you're removing it?
                            </p>
                        </div>

                        <div className="mb-8">
                            <textarea
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                                placeholder="Example: Changed my mind, found better price, etc."
                                className="w-full px-4 py-3 h-28 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] focus:bg-white transition-all resize-none placeholder-gray-400"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={confirmDelete}
                                className="w-full bg-[#8B5E3C] text-white py-4 rounded-2xl font-bold hover:bg-[#7a5234] transition-all shadow-lg shadow-[#8B5E3C]/20 hover:-translate-y-0.5"
                            >
                                Yes, Remove Item
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full py-4 rounded-2xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a0f0a] transition-all"
                            >
                                No, Keep It
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl mt-12">

                <h1 className="text-4xl md:text-[40px] font-black text-[#3a2a22] dark:text-[#f0e9e2] mb-12 tracking-tight">
                    Your Cart
                </h1>

                <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-[#2c1810] border border-gray-100 dark:border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                            {/* Image */}
                            <div className="w-40 h-28 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                                    {item.description}
                                </p>

                                <div className="mt-4 flex items-center justify-center md:justify-start gap-6">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </button>
                                        <span className="text-xl font-bold text-[#2c1810] dark:text-white w-4 text-center">
                                            {item.quantity || 1}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Price and Delete */}
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-black text-[#2c1810] dark:text-white">
                                    ${(item.price * (item.quantity || 1)).toFixed(0)}
                                </span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    aria-label="Remove item"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="bg-white dark:bg-[#2c1810] border border-gray-100 dark:border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <div className="text-3xl font-black text-[#2c1810] dark:text-white">
                        Total: <span className="text-[#8B5E3C]">${calculateTotal()}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            to="/special-coffee"
                            className="px-8 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-[#1a0f0a] transition-all"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Continue Shopping
                        </Link>
                        <Link
                            to="/checkout"
                            className="bg-[#8B5E3C] hover:bg-[#7a5234] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[#8B5E3C]/20 hover:-translate-y-0.5 transition-all"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
