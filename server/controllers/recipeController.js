const Recipe = require('../models/Recipe');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
    try {
        const { page = 1, limit = 10, recipeType, dietType, search } = req.query;

        // Build filter object
        const filter = {};
        if (recipeType) filter.recipeType = recipeType;
        if (dietType && dietType !== 'none') filter.dietType = dietType;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const recipes = await Recipe.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .exec();

        // Return only the recipes data
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Return only the recipe data
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Public (you might want to add authentication later)
const createRecipe = async (req, res) => {
    try {
        const { title, imageUrl, recipeType, dietType, description, ingredients, directions, tip } = req.body;

        const recipe = await Recipe.create({
            title,
            imageUrl,
            recipeType,
            dietType,
            description,
            ingredients,
            directions,
            tip
        });

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });
    } catch (error) {
        console.error('Error creating recipe:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Public (you might want to add authentication later)
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            data: recipe
        });
    } catch (error) {
        console.error('Error updating recipe:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Public (you might want to add authentication later)
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
