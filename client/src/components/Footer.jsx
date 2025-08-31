import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubscribeForm from './SubscribeForm';
import SaporitoBiteLogo from '../assets/SaporitoBiteWhite.svg';

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to About Creator section

    const handleCreatorClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/about') {
            const el = document.getElementById('about-creator');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/about');
            // Wait for navigation, then scroll
            setTimeout(() => {
                const el = document.getElementById('about-creator');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    };

    return (
        <footer className="bg-[#202020] text-white pt-5 pb-6 px-4 md:px-8 lg:px-16" aria-label="Footer">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="mb-4 inline-block" onClick={handleBackToTop}>
                            <img src={SaporitoBiteLogo} alt="SaporitoBite Logo" className="h-20 cursor-pointer" />
                        </Link>


                        <div className="grid grid-cols-2 gap-6">

                            <nav>
                                <h4 className="font-semibold text-lg mb-3 text-[#bfa074] uppercase tracking-wider border-b-2 border-[#bfa074] pb-1">
                                    Navigate
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link to="/recipes" className="hover:text-[#bfa074] transition-colors" onClick={handleBackToTop}>
                                            All Recipes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/cookbook" className="hover:text-[#bfa074] transition-colors" onClick={handleBackToTop}>
                                            CookBook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="hover:text-[#bfa074] transition-colors" onClick={handleBackToTop}>
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav>
                                <h4 className="font-semibold text-lg mb-3 text-[#bfa074] uppercase tracking-wider border-b-2 border-[#bfa074] pb-1">
                                    Legal
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link to="/privacy-policy" className="hover:text-[#bfa074] transition-colors" onClick={handleBackToTop}>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-of-service" className="hover:text-[#bfa074] transition-colors" onClick={handleBackToTop}>
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-xl font-semibold mb-4 text-center">Stay in Touch</h3>

                        <div className="flex space-x-4 mb-6 justify-center w-full">
                            <a href="#" className="text-white hover:text-[#bfa074]" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>

                            <a href="#" className="text-white hover:text-[#bfa074]" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            <a href="#" className="text-white hover:text-[#bfa074]" aria-label="Pinterest">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                            </a>

                            <a href="#" className="text-white hover:text-[#bfa074]" aria-label="X">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 1200 1227">
                                    <path d="M1152.6 0H892.7L600.2 418.6 307.7 0H47.8l404.7 570.6L0 1227h259.9l340.3-493.2 340.3 493.2H1200L795.3 656.4 1152.6 0zM900.2 1120.1l-299.9-434.5-299.9 434.5H144.6l355.6-511.2L144.6 106.9h155.8l299.9 434.5 299.9-434.5h155.8l-355.6 511.2 355.6 511.2h-155.8z" />
                                </svg>
                            </a>

                            <a href="#" className="text-white hover:text-[#bfa074]" aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                        </div>

                        <div className="w-full md:w-auto">
                            <SubscribeForm variant="dark" />
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-sm text-gray-400 text-center">
                    &copy; {new Date().getFullYear()} SaporitoBite. All rights reserved.<br />
                    Creator: <a
                        href="/about#about-creator"
                        className="text-[#bfa074] hover:underline font-semibold cursor-pointer"
                        onClick={handleCreatorClick}
                    >
                         Govind Singh
                    </a>
                </div>
            </div>

            <div
                className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                    }`}
            >
                <button
                    onClick={handleBackToTop}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f2ee] text-black border-2 border-black shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl focus:outline-none hover:-translate-y-1"
                    aria-label="Scroll back to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </footer>
    );
}