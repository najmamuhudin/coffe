import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
            setError("Please fill in all required fields.");
            return;
        }

        // Simulate Auth
        if (isLogin) {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find((u) => u.email === formData.email && u.password === formData.password);
            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.dispatchEvent(new Event('userLogin'));
                if (location.pathname === "/auth") {
                    navigate("/");
                }
            } else {
                setError("Invalid email or password.");
            }
        } else {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const userExists = users.some((u) => u.email === formData.email);
            if (userExists) {
                setError("Email already exists.");
            } else {
                const newUser = { name: formData.name, email: formData.email, password: formData.password };
                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                window.dispatchEvent(new Event('userLogin'));
                if (location.pathname === "/auth") {
                    navigate("/");
                }
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white dark:bg-[#2c1810] p-8 rounded-3xl shadow-xl transition-colors duration-300 border border-gray-100 dark:border-gray-800">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-[#2c1810] dark:text-[#f0e9e2]">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {isLogin ? "Sign in to your Coffeo account" : "Join us to get the best coffee beans"}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] focus:bg-white transition-all"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="hello@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a0f0a] dark:text-white text-sm outline-none focus:border-[#8B5E3C] focus:bg-white transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#8B5E3C] text-white py-3.5 rounded-xl font-bold hover:bg-[#7a5234] transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                        className="font-bold text-[#8B5E3C] hover:text-[#7a5234] transition"
                    >
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
