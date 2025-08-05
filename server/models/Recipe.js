const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a recipe title'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL'],
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
            },
            message: 'Please provide a valid image URL ending with .jpg, .jpeg, .png, .gif, or .webp'
        }
    },
    recipeType: {
        type: String,
        required: [true, 'Please specify the recipe type'],
        enum: {
            values: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'main-course', 'side-dish', 'salad', 'soup'],
            message: 'Recipe type must be one of: breakfast, lunch, dinner, snack, dessert, appetizer, main-course, side-dish, salad, soup'
        }
    },
    dietType: {
        type: String,
        required: [true, 'Please specify the diet type'],
        enum: {
            values: ['vegetarian', 'vegan', 'non-vegetarian', 'gluten-free', 'keto', 'paleo', 'dairy-free'],
            message: 'Diet type must be one of: vegetarian, vegan, non-vegetarian, gluten-free, keto, paleo, dairy-free'
        }
    },
    description: {
        type: String,
        required: [true, 'Please provide a recipe description'],
        trim: true
    },
    ingredients: [{
        type: String,
        required: true,
        trim: true
    }],
    directions: [{
        type: String,
        required: true,
        trim: true
    }],
    tip: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Recipe must be created by a user']
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
