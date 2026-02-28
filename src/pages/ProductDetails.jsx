import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsWishlisted(wishlist.some(item => item.id === product.id));
    }
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;

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
    if (!product) return;

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

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));

    const timer = setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#8B5E3C] font-medium animate-pulse">Checking records...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the coffee item you're looking for.</p>
        <button onClick={() => navigate("/")} className="text-[#8B5E3C] font-bold hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 animate-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-[#8B5E3C] transition font-semibold"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left - Image */}
        <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl bg-white dark:bg-[#2c1810]">
          <img
            src={product.image}
            className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
            alt={product.name}
          />
          {product.badge && (
            <div className="absolute top-6 left-6 bg-[#8B5E3C] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div className="space-y-8 lg:pt-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#f0e9e2] dark:bg-[#3d2116] text-[#8B5E3C] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {product.type || "Signature Blend"}
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-[#2c1810] dark:text-[#f0e9e2] leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm">Was ${product.oldPrice}</span>
              )}
              <span className="text-4xl font-black text-[#8B5E3C]">
                ${product.price}
              </span>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-800"></div>
            <div className="space-y-1">
              <div className="flex text-yellow-500 text-lg">
                {"★".repeat(5)}
              </div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-tighter">Verified Choice</p>
            </div>
          </div>

          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
            {product.description || "Indulge in our premium selected brew. Each bean is hand-picked and roasted to perfection, ensuring a rich and unforgettable coffee experience delivered straight to your home."}
          </p>

          <div className="pt-6 space-y-5">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-[#8B5E3C] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#7a5234] transition shadow-xl hover:-translate-y-1 active:translate-y-0 duration-200"
              >
                {added ? "✓ Added" : "Add to Cart"}
              </button>
              <button
                onClick={toggleWishlist}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "#8B5E3C" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isWishlisted ? 'text-[#8B5E3C]' : ''} transition`}>
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-gray-100 dark:border-gray-800">
              {["Organic", "Ethical", "Fresh"].map((tag) => (
                <span key={tag} className="flex-1 text-center py-2 bg-gray-50 dark:bg-[#1a0f0a] rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest border border-transparent dark:border-gray-800 hover:border-[#8B5E3C] transition transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;