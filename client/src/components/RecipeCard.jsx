import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    const formatRecipeType = (type) => {
        if (!type) return '';
        return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
    };

    return (
        <Link
            to={`/recipe/${recipe._id}`}
            className="group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    {/* Show recipe types as tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {recipe.recipeTypes && recipe.recipeTypes.map((type, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                            >
                                {formatRecipeType(type)}
                            </span>
                        ))}
                    </div>
                    <h3 className="font-serif text-xl mb-2 group-hover:text-amber-700 transition-colors">
                        {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {recipe.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;