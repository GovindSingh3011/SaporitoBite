import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipeType, setSelectedRecipeType] = useState('');
    const [selectedDietType, setSelectedDietType] = useState('');

    const recipeTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'mains', 'sides', 'salad', 'soup'];
    const dietTypes = ['vegetarian', 'vegan', 'non-vegetarian', 'gluten-free', 'keto', 'paleo', 'dairy-free'];

    const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                let queryParams = new URLSearchParams();
                if (selectedRecipeType) queryParams.append('recipeType', selectedRecipeType);
                if (selectedDietType) queryParams.append('dietType', selectedDietType);

                const response = await axios.get(`${BASE_URL}/api/recipes?${queryParams}`);
                setRecipes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch recipes. Please try again later.');
                setLoading(false);
                console.error('Error fetching recipes:', err);
            }
        };

        fetchRecipes();
    }, [selectedRecipeType, selectedDietType]);

    const clearFilters = () => {
        setSelectedRecipeType('');
        setSelectedDietType('');
    };

    return (
        <div className="min-h-screen bg-[#f5f2ee] text-black py-6">
            <div className=" py-8 mb-4">
                <h1 className="text-7xl font-serif text-center">Recipes</h1>
                <div className="w-1/3 h-px bg-black mx-auto mt-6"></div>
            </div>

            {/* Filters */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
                    {/* Recipe Type Filter */}
                    <select
                        className="border-b border-black bg-transparent py-2 px-4 w-full md:w-64 focus:outline-none"
                        value={selectedRecipeType}
                        onChange={(e) => setSelectedRecipeType(e.target.value)}
                    >
                        <option value="">Select Recipe Types</option>
                        {recipeTypes.map(type => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>

                    {/* Diet Type Filter */}
                    <select
                        className="border-b border-black bg-transparent py-2 px-4 w-full md:w-64 focus:outline-none"
                        value={selectedDietType}
                        onChange={(e) => setSelectedDietType(e.target.value)}
                    >
                        <option value="">Select Diet Types</option>
                        {dietTypes.map(type => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={clearFilters}
                        className="text-black hover:underline py-2"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Recipes Grid */}
                {loading ? (
                    <div className="text-center py-10">Loading recipes...</div>
                ) : error ? (
                    <div className="text-center text-red-600 py-10">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.length > 0 ? (
                            recipes.map(recipe => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                No recipes found. Try different filters or check back later.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipes;