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
            .populate('createdBy', 'name role')
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
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name role');

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

// @desc    Get user's own recipes (for chefs to see their recipes)
// @route   GET /api/recipes/my-recipes
// @access  Private (Chef/Admin)
const getMyRecipes = async (req, res) => {
    try {
        const { page = 1, limit = 10, recipeType, dietType, search } = req.query;

        // Build filter object - always filter by current user
        const filter = { createdBy: req.user.id };
        if (recipeType) filter.recipeType = recipeType;
        if (dietType && dietType !== 'none') filter.dietType = dietType;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const recipes = await Recipe.find(filter)
            .populate('createdBy', 'name role')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .exec();

        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private (Chef/Admin)
const createRecipe = async (req, res) => {
    try {
        const { title, recipeType, dietType, description, ingredients, directions, tip } = req.body;

        // Get image URL from Cloudinary upload (if image was uploaded)
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path; // Cloudinary URL
        }

        const recipe = await Recipe.create({
            title,
            imageUrl,
            recipeType,
            dietType,
            description,
            ingredients,
            directions,
            tip,
            createdBy: req.user.id
        });

        // Populate the created recipe with user info
        await recipe.populate('createdBy', 'name role');

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
// @access  Private (Chef can update own recipes, Admin can update any)
const updateRecipe = async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check ownership: Chef can only update their own recipes, Admin can update any
        if (req.user.role === 'chef' && recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this recipe. You can only update recipes you created.'
            });
        }

        // Update the recipe with new data
        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedBy: req.user.id
            },
            {
                new: true,
                runValidators: true
            }
        ).populate('createdBy', 'name role').populate('updatedBy', 'name role');

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
// @access  Private (Chef can delete own recipes, Admin can delete any)
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Check ownership: Chef can only delete their own recipes, Admin can delete any
        if (req.user.role === 'chef' && recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this recipe. You can only delete recipes you created.'
            });
        }

        await Recipe.findByIdAndDelete(req.params.id);

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
    getMyRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
