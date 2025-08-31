import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    const [randomTip, setRandomTip] = useState("");
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cookingTips = [
        "Add a pinch of salt to bring out sweetness in plant-based desserts.",
        "Roast vegetables at high heat for caramelized edges and deeper flavor.",
        "Massage kale with olive oil and salt to tenderize it before using in salads.",
        "Toast nuts before adding to dishes for enhanced flavor and crunch.",
        "Soak dried mushrooms to create an umami-rich vegetable broth.",
        "Add nutritional yeast to plant-based sauces for a cheesy flavor.",
        "Let tofu press for 30 minutes before marinating for better texture.",
        "Room temperature ingredients incorporate better in vegan batters.",
        "Blend silken tofu with cocoa for a rich dairy-free chocolate mousse.",
        "Roast garlic before adding to plant-based dishes for mellow sweetness.",
        "Microplane frozen avocados for instant creamy salad dressings.",
        "Add a splash of vinegar when cooking beans to make them more tender."
    ];

    useEffect(() => {
        setRandomTip(cookingTips[Math.floor(Math.random() * cookingTips.length)]);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20,50 C20,40 80,40 80,50 L80,80 C80,85 75,90 70,90 L30,90 C25,90 20,85 20,80 Z" fill="#c39356" />
                            <path d="M15,50 L85,50" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                            <path d="M30,40 L30,35 C30,30 35,30 40,30 L60,30 C65,30 70,30 70,35 L70,40" stroke="#333" strokeWidth="3" />

                            <g className="animate-pulse opacity-80">
                                <path d="M40,30 C40,20 45,25 45,15" stroke="#c39356" strokeWidth="2" strokeLinecap="round" fill="none" />
                                <path d="M50,25 C50,15 55,20 55,10" stroke="#c39356" strokeWidth="2" strokeLinecap="round" fill="none" />
                                <path d="M60,30 C60,20 65,25 65,15" stroke="#c39356" strokeWidth="2" strokeLinecap="round" fill="none" />
                            </g>

                            <text x="50" y="70" fontFamily="Arial" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">404</text>
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 text-amber-700">Recipe Not Found!</h1>
                <p className="text-xl mb-6 text-gray-700">
                    Oops! Looks like this page has been<br />consumed by hungry food lovers.
                </p>

                <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Chef's Tip While You're Here:</h3>
                    <p className="italic text-amber-700">{randomTip}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Link to="/" className="flex items-center justify-center bg-amber-700 text-white py-3 px-6 rounded-md hover:bg-amber-800 transition duration-300 transform hover:scale-105" onClick={handleBackToTop}>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Back to Home
                    </Link>
                    <Link to="/recipes" className="flex items-center justify-center border-2 border-amber-700 text-amber-700 py-3 px-6 rounded-md hover:bg-amber-50 transition duration-300 transform hover:scale-105" onClick={handleBackToTop}>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Browse Our Recipes
                    </Link>
                </div>

                <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                    <p className="italic">
                        Can't find what you're <span className="font-medium">cooking</span> for?
                        <span className="block mt-1">Whisk away to our search bar and let your culinary adventure continue!</span>
                    </p>
                </div>
            </div>
        </div>
    );
}