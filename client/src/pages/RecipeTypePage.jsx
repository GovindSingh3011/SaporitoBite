import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const baseurl = import.meta.env.VITE_APP_API_URL;

const RecipeTypePage = () => {
    const { type } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatTypeTitle = (typeStr) => {
        return typeStr.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`${baseurl}/api/recipes?recipeType=${type}`)
            .then(res => {
                let data = res.data;
                if (Array.isArray(data)) setRecipes(data);
                else if (Array.isArray(data.recipes)) setRecipes(data.recipes);
                else setRecipes([]);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load recipes. Please try again later.');
                setRecipes([]);
                setLoading(false);
                console.error('Error fetching recipes:', err);
            });
    }, [type]);

    return (
        <div className="bg-[#f5f2ee] text-black">
            {/* Header Section */}
            <div className="py-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                        <Link to="/recipes" className="hover:text-[#bfa074] transition-colors">
                            All Recipes
                        </Link>
                        <span>›</span>
                        <span className="capitalize">{formatTypeTitle(type)}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-center">
                        {formatTypeTitle(type)}
                    </h1>
                    <div className="w-1/4 h-px bg-black mx-auto mt-6"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-5 pb-20">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-black border-t-[#bfa074] rounded-full animate-spin mb-3"></div>
                            <p className="text-lg">Loading recipes...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {recipes && recipes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recipes.map(recipe => (
                                    <RecipeCard key={recipe._id} recipe={recipe} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <h3 className="text-2xl font-serif mb-3">No recipes found</h3>
                                <p className="text-gray-600 mb-6">
                                    We couldn't find any {formatTypeTitle(type)} recipes.
                                </p>
                                <Link to="/recipes"
                                    className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-[#bfa074] transition-colors">
                                    Browse All Recipes
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RecipeTypePage;