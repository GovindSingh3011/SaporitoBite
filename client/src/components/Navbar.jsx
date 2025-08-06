import { useState, useRef } from 'react';

import SpoonSageLogo from '../assets/SpoonSage.svg';

export default function Navbar() {
    const [showRecipes, setShowRecipes] = useState(false);
    const [dropdownRecipes] = useState([
        'breakfast',
        'lunch',
        'dinner',
        'snack',
        'dessert',
        'appetizer',
        'main-course',
        'side-dish',
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

    return (
        <>
            <nav className="flex items-center bg-[#f5f2ee] h-15 px-10 font-serif">
                <a href="/">
                    <img src={SpoonSageLogo} alt="SpoonSage Logo" className="h-10 mr-10 cursor-pointer" />
                </a>
                <div className="flex-1"></div>
                <ul className="flex gap-8 items-center list-none m-0 p-0">
                    <li>
                        <a href="/" className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors">Home</a>
                    </li>
                    <li
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <a className="text-black text-lg font-medium hover:text-[#bfa074] transition-colors flex items-center">
                            Recipes <span className="ml-1">&#9662;</span>
                        </a>
                        {showRecipes && (
                            <div
                                className="absolute left-0 top-8 bg-white border border-gray-200 shadow-lg min-w-[220px] z-10 flex flex-col"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {dropdownRecipes.length > 0 ? (
                                    <>
                                        <a
                                            key="all-recipes"
                                            href="/recipes"
                                            className="px-5 py-3 text-black text-base hover:bg-[#f5f2ee] hover:text-[#bfa074] transition-colors"
                                        >
                                            All Recipes
                                        </a>
                                        {dropdownRecipes.map((type) => (
                                            <a
                                                key={type}
                                                href={`/recipes?recipeType=${encodeURIComponent(type)}`}
                                                className="px-5 py-3 text-black text-base hover:bg-[#f5f2ee] hover:text-[#bfa074] transition-colors"
                                            >
                                                {type}
                                            </a>
                                        ))}
                                    </>
                                ) : (
                                    <div className="px-5 py-3 text-gray-500 text-base">No recipe types found.</div>
                                )}
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
                        <button className="bg-black text-white px-5 py-1 text-lg font-semibold rounded hover:bg-[#bfa074] hover:text-black transition-colors">
                            Subscribe
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="w-full flex justify-center">
                <div className="w-[97%] h-px bg-black rounded-full" />
            </div>
        </>
    );
}