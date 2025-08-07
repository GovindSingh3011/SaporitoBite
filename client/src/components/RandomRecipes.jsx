import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

function RandomRecipes({ count = 4, dietType }) {
    const [recipes, setRecipes] = useState([]);
    const BaseURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchRandomRecipes = async () => {
            try {
                const response = await fetch(`${BaseURL}/api/recipes?dietType=${encodeURIComponent(dietType || '')}`);
                const data = await response.json();
                const allRecipes = Array.isArray(data) ? data :
                    data.data ? data.data :
                        data.recipes ? data.recipes : [];

                const shuffled = allRecipes.sort(() => 0.5 - Math.random());
                const recipeData = shuffled.slice(0, count);

                setRecipes(recipeData);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };

        fetchRandomRecipes();
    }, [count, BaseURL, dietType]);

    return (
        <div className="container py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Discover More Recipes</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="min-w-[10rem] w-65 flex-shrink-0">
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
                <style jsx="true">{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </div>
    );
}

export default RandomRecipes;