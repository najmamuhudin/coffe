import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Product", href: "/#products" },
  { label: "Special coffee", href: "/special-coffee" },
  { label: "About", href: "/about" },
];

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [toastContent, setToastContent] = useState({ title: "Item Added!", msg: "Successfully added to your cart.", type: "added" });

  useEffect(() => {
    const syncState = () => {
      const user = localStorage.getItem("currentUser");
      setCurrentUser(user ? JSON.parse(user) : null);

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    };

    const handleCartUpdate = (e) => {
      syncState();

      const action = e.detail?.action;
      if (action === 'added') {
        setToastContent({ title: "Item Added!", msg: "Successfully added to your cart.", type: "added" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else if (action === 'deleted') {
        setToastContent({ title: "Item Deleted!", msg: "Successfully removed from your cart.", type: "deleted" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };

    const handleWishlistUpdate = (e) => {
      const action = e.detail?.action || 'added';
      if (action === 'added') {
        setToastContent({ title: "Added to Wishlist!", msg: "Item saved to your favorites.", type: "wishlist_added" });
      } else {
        setToastContent({ title: "Removed from Wishlist!", msg: "Item removed from your favorites.", type: "wishlist_removed" });
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    syncState();
    window.addEventListener('storage', syncState);
    window.addEventListener('userLogin', syncState);
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('storage', syncState);
      window.removeEventListener('userLogin', syncState);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#2c1810]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-[88%] mx-auto flex items-center justify-between py-3.5 px-4 md:px-6">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center justify-start flex-1 gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={isMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>

          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-[#8B5E3C] rounded-xl flex items-center justify-center shadow-lg shadow-[#8B5E3C]/20 group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" /></svg>
            </div>
            <span className="text-xl font-black text-[#2c1810] dark:text-[#f0e9e2] tracking-tighter uppercase">Coffeo</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-bold transition-all ${isActive ? 'text-[#8B5E3C]' : 'text-gray-500 hover:text-[#8B5E3C] dark:text-gray-400'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end flex-1 gap-3">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {theme === "light" ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v20M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>}
          </button>

          {currentUser && (
            <Link to="/cart" className="w-9 h-9 relative flex items-center justify-center rounded-lg bg-[#fcead2] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-[#8B5E3C] border-2 border-white dark:border-[#2c1810] text-[10px] font-black text-white px-1">{cartCount}</span>}
            </Link>
          )}

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block" />

          {currentUser ? (
            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-0.5">Welcome</span>
                <span className="text-sm font-black text-[#2c1810] dark:text-[#f0e9e2] leading-none">{currentUser.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={() => { localStorage.removeItem("currentUser"); window.dispatchEvent(new Event('userLogin')); }}
                className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="text-sm font-bold bg-[#8B5E3C] text-white px-5 py-2 rounded-lg hover:bg-[#7a5234] transition shadow-md">Sign In</Link>
          )}
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 border-t' : 'max-h-0'}`}>
        <div className="flex flex-col p-4 gap-4 bg-gray-50 dark:bg-[#1a0f0a]">
          {NAV_LINKS.map(link => (
            <NavLink key={link.label} to={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#8B5E3C]">{link.label}</NavLink>
          ))}
          {!currentUser && <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-[#8B5E3C]">Sign In</Link>}
        </div>
      </div>

      {/* Notification Toast */}
      <div className={`fixed top-5 right-5 z-[60] bg-white dark:bg-[#2c1810] border-l-4 ${toastContent.type.includes('wishlist') ? 'border-[#8B5E3C]' : toastContent.type === 'added' ? 'border-[#8B5E3C]' : 'border-red-500'} shadow-2xl rounded-xl p-4 flex items-center gap-4 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`w-9 h-9 ${toastContent.type === 'added' || toastContent.type === 'wishlist_added' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} rounded-full flex items-center justify-center shrink-0`}>
          {toastContent.type.includes('wishlist') ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill={toastContent.type === 'wishlist_added' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <div>
          <h4 className="font-bold text-[#2c1810] dark:text-[#f0e9e2] text-sm">{toastContent.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{toastContent.msg}</p>
        </div>
        {toastContent.type === 'added' ? (
          <Link to="/cart" onClick={() => setShowToast(false)} className="ml-2 text-xs font-bold text-[#8B5E3C] hover:underline">
            View Cart
          </Link>
        ) : (
          <button onClick={() => setShowToast(false)} className="ml-2 text-xs font-bold text-gray-400 hover:text-gray-600">
            Dismiss
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;