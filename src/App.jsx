import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import About from "./pages/About";
import SpecialCoffee from "./pages/SpecialCoffee";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function Layout({ children }) {
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const hideNavAndFooter = location.pathname === "/auth";

    // Protect Cart, Checkout, or order-confirmation page
    const protectedRoutes = ["/cart", "/checkout", "/order-confirmation"];
    if (protectedRoutes.includes(location.pathname) && !currentUser) {
        return <Auth />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#fdfaf7] text-gray-900 dark:bg-[#1a0f0a] dark:text-gray-100 transition-colors duration-300">
            {!hideNavAndFooter && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!hideNavAndFooter && <Footer />}
        </div>
    );
}

function App() {
    const [userUpdated, setUserUpdated] = useState(0);

    useEffect(() => {
        const handleLogin = () => setUserUpdated(prev => prev + 1);
        window.addEventListener('userLogin', handleLogin);
        return () => window.removeEventListener('userLogin', handleLogin);
    }, []);

    return (
        <ThemeProvider>
            <Router>
                <Layout key={userUpdated}>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/special-coffee" element={<SpecialCoffee />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
