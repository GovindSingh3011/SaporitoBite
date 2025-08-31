import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RandomRecipes from '../components/RandomRecipes';
import SubscribeForm from '../components/SubscribeForm';

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const BaseURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        async function fetchRecipe() {
            try {
                setLoading(true);
                const response = await fetch(`${BaseURL}/api/recipes/${id}`);

                if (!response.ok) {
                    throw new Error('Recipe not found');
                }

                const result = await response.json();

                // Check if the response has a data property
                if (result.data) {
                    setRecipe(result.data);  // Use result.data instead of data directly
                } else if (result.success === false) {
                    throw new Error(result.message || 'Recipe not found');
                } else {
                    setRecipe(result);  // Fallback to using the result directly
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError(err.message);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [id, BaseURL]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!recipe) return <div className="min-h-screen flex items-center justify-center">Recipe not found</div>;

    return (
        <div className="min-h-screen text-[#333]">
            {/* Breadcrumb Navigation */}
            <div className="px-8 py-4 text-gray-600">
                <Link to="/" className="hover:underline" onClick={handleBackToTop}>Home</Link> &gt; <Link to="/recipes" className="hover:underline" onClick={handleBackToTop}>Recipes</Link> &gt; <span>{recipe.title}</span>
            </div>

            <div className="container mx-auto px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Recipe Image */}
                    <div>
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="w-full rounded-md object-cover"
                        />
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-12 mb-6">{recipe.title}</h1>
                        {/* Recipe Tags */}
                        <div className="mb-6">
                            <div className="flex gap-2 flex-wrap">
                                {recipe.dietTypes && recipe.dietTypes.map((diet, idx) => (
                                    <span key={diet + idx} className="bg-blue-100 text-blue-800 px-4 py-1 rounded">
                                        {diet.replace('-', ' ')}
                                    </span>
                                ))}
                                {recipe.recipeTypes && recipe.recipeTypes.map((type, idx) => (
                                    <span key={type + idx} className="bg-green-100 text-green-800 px-4 py-1 rounded">
                                        {type.replace('-', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Recipe Description */}
                        <p className="mb-6 text-lg">{recipe.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t pt-12">
                    {/* Ingredients */}
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Ingredients</h2>
                        <ul className="list-disc pl-5 space-y-3">
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-lg">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Directions */}
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Directions</h2>
                        <ol className="list-decimal pl-5 space-y-4">
                            {recipe.directions && recipe.directions.map((step, index) => (
                                <li key={index} className="text-lg">{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Chef's Tip */}
                {recipe.tip && (
                    <div className="mt-12 border p-8 mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">Chef's Tip</h2>
                        <p className="text-center text-lg">{recipe.tip}</p>
                    </div>
                )}

                {/* Subscribe Form */}
                <div className="my-12 flex justify-center">
                    <SubscribeForm variant="gold" />
                </div>

                {/* More Recipes Section */}
                <div className="mt-16 mb-12 border-t pt-8">
                    <RandomRecipes count={6} dietType={recipe.dietTypes?.[0]} />
                </div>
            </div>
        </div>
    );
}

export default Recipe;