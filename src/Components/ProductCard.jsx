import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.some(item => item.id === product.id);
  });
  const navigate = useNavigate();

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/auth");
      return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isCurrentlyWishlisted = wishlist.some(item => item.id === product.id);

    if (isCurrentlyWishlisted) {
      wishlist = wishlist.filter(item => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { action: isCurrentlyWishlisted ? 'removed' : 'added' } }));
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/auth");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'added' } }));
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-[#2c1810] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-[#8B5E3C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {product.badge}
        </div>
      )}
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 bg-[#2c1810] dark:bg-[#8B5E3C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          NEW
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#1a0f0a]/80 shadow-sm hover:scale-110 transition"
        aria-label="Wishlist"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill={isWishlisted ? "#8B5E3C" : "none"} stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <div className="overflow-hidden bg-white dark:bg-[#1a0f0a]/20 flex items-center justify-center h-44">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {product.type && (
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
            {product.type}
          </p>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#2c1810] dark:text-[#f0e9e2] text-sm leading-tight hover:text-[#8B5E3C] transition">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          {product.oldPrice && (
            <span className="text-gray-400 dark:text-gray-600 text-[11px] line-through">
              ${product.oldPrice}
            </span>
          )}
          <span className="text-[#8B5E3C] font-bold text-sm">
            ${product.price}
          </span>
        </div>

        {/* Add to cart row */}
        <div className="flex items-center justify-between mt-3 gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 text-[11px] font-bold flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white transition-all duration-200"
          >
            {added ? "✓ Added" : "Add to cart →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;