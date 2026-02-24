import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

function Layout({ children }) {
    const location = useLocation();
    const hideNavAndFooter = location.pathname === "/auth";

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
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
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
