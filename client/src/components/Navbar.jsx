import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import SaporitoBiteLogo from '../assets/SaporitoBiteBlack.svg';
import SubscribeModal from './SubscribeModal';

export default function Navbar() {
    const [showRecipes, setShowRecipes] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSubscribe, setShowSubscribe] = useState(false);
    const [dropdownRecipes] = useState([
        'breakfast',
        'lunch',
        'dinner',
        'snack',
        'dessert',
        'appetizer',
        'mains',
        'sides',
        'salad',
        'soup'
    ]);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowRecipes(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowRecipes(false);
        }, 300);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (showRecipes) setShowRecipes(false);
    };

    const toggleMobileRecipes = () => {
        setShowRecipes(!showRecipes);
    };

    return (
        <>
            <nav className="flex items-center justify-between bg-[#f5f2ee] h-15 px-4 md:px-10 font-serif relative">
                {/* Logo - always visible */}
                <a href="/" className="z-20">
                    <img src={SaporitoBiteLogo} alt="SaporitoBite Logo" className="h-8 md:h-10 cursor-pointer" />
                </a>

                {/* Mobile menu button */}
                <button
                    className="md:hidden z-20 p-2"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {!mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-end">
                    <ul className="flex gap-8 items-center list-none m-0 p-0">
                        <li>
                            <a href="/" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors">Home</a>
                        </li>
                        <li
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors flex items-center cursor-pointer">
                                Recipes <span className="ml-1">&#9662;</span>
                            </a>
                            {showRecipes && (
                                <div
                                    className="absolute left-0 top-8 bg-white border border-gray-200 shadow-lg min-w-[220px] z-10 flex flex-col"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <a
                                        key="all-recipes"
                                        href="/recipes"
                                        className="px-5 py-3 text-black text-base hover:bg-[#f5f2ee] hover:text-[#bfa074] transition-colors"
                                    >
                                        All Recipes
                                    </a>
                                    {dropdownRecipes.map((type) => (
                                        <Link
                                            key={type}
                                            to={`/recipes/type/${encodeURIComponent(type)}`}
                                            className="px-5 py-3 text-black text-base hover:bg-[#f5f2ee] hover:text-[#bfa074] transition-colors"
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li>
                            <a href="/cookbook" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors">CookBook</a>
                        </li>
                        <li>
                            <a href="/about" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors">About</a>
                        </li>
                        <li>
                            <button className="bg-black text-white px-5 py-1 text-lg rounded hover:bg-[#bfa074] hover:text-black transition-colors"
                                onClick={() => {
                                    setShowSubscribe(true);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Subscribe
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-0 left-0 w-full bg-[#f5f2ee] z-10 pt-20 pb-6 px-6 shadow-lg">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="/" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors block py-2">Home</a>
                            </li>
                            <li>
                                <div
                                    className="flex justify-between items-center py-2"
                                    onClick={toggleMobileRecipes}
                                >
                                    <span className="text-black text-lg font-medium">Recipes</span>
                                    <span className="ml-2">{showRecipes ? '▲' : '▼'}</span>
                                </div>
                                {showRecipes && (
                                    <div className="pl-4 flex flex-col gap-2 mt-2">
                                        <a
                                            href="/recipes"
                                            className="text-black textbase hover:text-[#bfa074] transition-colors block py-2"
                                        >
                                            All Recipes
                                        </a>
                                        {dropdownRecipes.map((type) => (
                                            <Link
                                                key={type}
                                                to={`/recipes/type/${encodeURIComponent(type)}`}
                                                className="text-black text-base hover:text-[#bfa074] transition-colors block py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                            <li>
                                <a href="/cookbook" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors block py-2">CookBook</a>
                            </li>
                            <li>
                                <a href="/about" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors block py-2">About</a>
                            </li>
                            <li className="mt-2">
                                <button
                                    className="w-full bg-black text-white py-2 text-lg rounded hover:bg-[#bfa074] hover:text-black transition-colors"
                                    onClick={() => {
                                        setShowSubscribe(true);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Subscribe
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
            <div className="w-full flex justify-center">
                <div className="w-[97%] h-px bg-black rounded-full" />
            </div>
            {showSubscribe && <SubscribeModal onClose={() => setShowSubscribe(false)} />}
        </>
    );
}