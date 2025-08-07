import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    const { _id, title, imageUrl, recipeType } = recipe;

    const formatRecipeType = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <Link to={`/recipe/${_id}`} className="block overflow-hidden group">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="mt-4 mb-2">
                <span className="bg-[#c7ded9] bg-opacity-90 text-[#333] px-4 py-1 text-sm font-medium">
                    {formatRecipeType(recipeType)}
                </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-black">
                {title}
            </h3>
        </Link>
    );
};

export default RecipeCard;