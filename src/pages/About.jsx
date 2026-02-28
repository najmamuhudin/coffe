import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    return (
        <div className="w-full">
            {/* ... other sections ... */}

            {/* Success Popup (Matching Home) */}
            {subscribed && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setSubscribed(false)}></div>
                    <div className="relative bg-white dark:bg-[#2c1810] rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 text-center">
                        <button
                            onClick={() => setSubscribed(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <h3 className="text-2xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-3">Subscribed!</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Thank you for subscribing to our newsletter.</p>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="max-w-[80%] mx-auto py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 flex flex-col items-start space-y-6">
                    <h1 className="text-5xl lg:text-6xl font-black text-[#2c1810] dark:text-[#f0e9e2] leading-[1.1]">
                        Discover Our <span className="text-[#8B5E3C]">Special Coffee</span> in <span className="text-[#8B5E3C]">Mogadishu</span>
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                        Founded with a passion for exceptional brewing, MogCoffee is dedicated to bringing you the finest special coffee. Our meticulously sourced beans and expert roasting techniques ensure an unforgettable coffee experience, transforming every cup into a celebration of flavor, quality, and community.
                    </p>
                </div>

                <div className="lg:w-1/2 flex flex-col items-center">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
                        alt="Coffee shop interior"
                        className="w-full rounded-2xl object-cover h-[350px] lg:h-[400px] shadow-lg mb-8"
                    />

                    <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-gray-700">
                            <h3 className="text-3xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-1">3+</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Years in<br />Operation</p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-gray-700">
                            <h3 className="text-3xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-1">50+</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Coffee Varieties</p>
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-gray-700">
                            <h3 className="text-3xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-1">10K+</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Happy<br />Customers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-[80%] mx-auto h-px bg-gray-200 dark:bg-gray-800"></div>

            {/* Mission & Vision Header */}
            <section className="max-w-[80%] mx-auto pt-20 pb-10">
                <h2 className="text-4xl lg:text-5xl font-black text-[#2c1810] dark:text-[#f0e9e2] leading-[1.2]">
                    Our Mission <br /> & <span className="text-[#8B5E3C]">Vision</span>
                </h2>
                <div className="w-16 h-1 bg-[#8B5E3C] mt-6"></div>
            </section>

            {/* Mission */}
            <section className="max-w-[90%] lg:max-w-[80%] mx-auto py-10">
                <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#1f110b] rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] gap-12">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800"
                                alt="Coffee beans and grinder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-5">Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To serve exceptional special coffee, foster community connections, and create a warm, inviting space where everyone feels welcome. We are dedicated to bringing the finest specialty roasts to Mogadishu while building lasting relationships with our community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="max-w-[90%] lg:max-w-[80%] mx-auto pb-20">
                <div className="flex flex-col md:flex-row-reverse items-center bg-white dark:bg-[#1f110b] rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] gap-12">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800"
                                alt="Barista making coffee"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-left md:text-right">
                        <h3 className="text-3xl font-bold text-[#2c1810] dark:text-[#f0e9e2] mb-5">Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To be the heart of Mogadishu's coffee culture by redefining the standard for special coffee. Known for our outstanding quality, community engagement, and positive impact on the local economy, we strive to bring you the best cup every single time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-[80%] mx-auto h-px bg-gray-200 dark:bg-gray-800"></div>

            {/* Team Section */}
            <section className="max-w-[80%] mx-auto py-20 text-center">
                <h2 className="text-4xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-4">
                    Our <span className="text-[#8B5E3C]">Team</span>
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-12">Meet the passionate individuals behind Coffeo</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Najma",
                            role: "Founder & CEO",
                            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
                            desc: "Coffee enthusiast with a vision to transform Mogadishu's coffee culture.",
                        },
                        {
                            name: "Albatross",
                            role: "Head Barista",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                            desc: "Award-winning barista with a passion for creating the perfect brew.",
                        },
                        {
                            name: "Nasteha",
                            role: "Community Manager",
                            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
                            desc: "Dedicated to fostering connections and building a vibrant coffee community.",
                        },
                        {
                            name: "kawser",
                            role: "Head of Operations",
                            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
                            desc: "Ensures smooth daily operations and maintains our high standards.",
                        }
                    ].map((member, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-[#1f110b] rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center">
                            <div className="w-28 h-28 mb-5 rounded-full overflow-hidden border-[3px] border-white dark:border-[#2c1810] shadow-md">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold text-[#2c1810] dark:text-[#f0e9e2]">{member.name}</h4>
                            <p className="text-sm font-semibold text-[#8B5E3C] mb-4">{member.role}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Newsletter / 25% OFF ── */}
            <section className="py-20 px-6 lg:px-10 bg-[#faf7f4] dark:bg-[#1a0f0a] relative overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto relative">
                    <div className="bg-[#f0e9e2] dark:bg-[#2c1810] rounded-3xl px-10 py-16 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden border border-transparent dark:border-gray-800">
                        {/* Content */}
                        <div className="flex-1 text-center">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2]">
                                Join in and get{" "}
                                <span className="text-[#8B5E3C]">25% OFF!</span>
                            </h2>
                            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                                Subscribe to our newsletter and get 10% OFF of your first order!
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (email.includes('@')) {
                                        setSubscribed(true);
                                        setEmail("");
                                    }
                                }}
                                className="mt-7 flex items-center max-w-md mx-auto gap-2"
                            >
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address..."
                                    className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a0f0a] dark:text-white rounded-full px-5 py-3 text-sm outline-none focus:border-[#8B5E3C] transition shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#8B5E3C] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#7a5234] transition shrink-0 shadow-md active:scale-95 duration-200"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
