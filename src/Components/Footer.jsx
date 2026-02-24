function Footer() {
    const year = new Date().getFullYear();

    const columns = [
        {
            title: "Privacy",
            links: ["Privacy policy", "Data policy", "Cookies"],
        },
        {
            title: "Services",
            links: ["Subscription", "Order status", "Menu"],
        },
        {
            title: "About us",
            links: ["About us", "Team", "Blog"],
        },
        {
            title: "Information",
            links: ["FAQ", "Jobs", "Test product"],
        },
    ];

    const socials = [
        {
            name: "Twitter",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            ),
        },
        {
            name: "YouTube",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-[#1a0f0a] text-gray-400">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
                {/* Top row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-[#8B5E3C] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M17 8h1a4 4 0 010 8h-1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-white font-black text-lg tracking-wider uppercase">Coffeo</span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-white text-sm font-bold mb-4">{col.title}</h4>
                            <ul className="space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm hover:text-[#8B5E3C] transition-colors duration-200">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social media */}
                    <div>
                        <h4 className="text-white text-sm font-bold mb-4">Social media</h4>
                        <div className="flex flex-wrap gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href="#"
                                    aria-label={s.name}
                                    className="w-8 h-8 rounded-full bg-[#2c1810] flex items-center justify-center text-gray-400 hover:bg-[#8B5E3C] hover:text-white transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-600">© {year} Coffeo. All rights reserved.</p>
                    <p className="text-xs text-gray-600">
                        Towork · Support · Blog
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
