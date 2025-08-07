const Recipe = require('../models/Recipe');
const { deleteImageFromCloudinary } = require('../utils/cloudinaryUtils');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
    try {
        const { page = 1, limit = 10, recipeType, dietType, search } = req.query;

        // Build filter object
        const filter = {};
        if (recipeType) filter.recipeTypes = { $in: [recipeType] };
        if (dietType && dietType !== 'none') filter.dietTypes = { $in: [dietType] };
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
        // Ensure fields are arrays
        const recipeTypes = Array.isArray(req.body.recipeTypes)
            ? req.body.recipeTypes
            : [req.body.recipeTypes];

        const dietTypes = Array.isArray(req.body.dietTypes)
            ? req.body.dietTypes
            : [req.body.dietTypes];

        // Create the recipe using the normalized arrays and set createdBy
        const recipe = await Recipe.create({
            ...req.body,
            recipeTypes,
            dietTypes,
            imageUrl: req.file ? req.file.path : req.body.imageUrl,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
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

        // Normalize recipeTypes and dietTypes to arrays if present in the request
        let updateData = { ...req.body, updatedBy: req.user.id };

        if (updateData.recipeTypes) {
            updateData.recipeTypes = Array.isArray(updateData.recipeTypes)
                ? updateData.recipeTypes
                : [updateData.recipeTypes];
        }

        if (updateData.dietTypes) {
            updateData.dietTypes = Array.isArray(updateData.dietTypes)
                ? updateData.dietTypes
                : [updateData.dietTypes];
        }

        // If a new image is uploaded
        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (recipe.imageUrl) {
                const deleteResult = await deleteImageFromCloudinary(recipe.imageUrl);
                if (!deleteResult.success) {
                    console.warn('Warning: Failed to delete old image from Cloudinary:', deleteResult.message);
                    // Continue with update even if old image deletion fails
                }
            }
            // Set new image URL
            updateData.imageUrl = req.file.path;
        }

        // Update the recipe with new data
        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updateData,
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

        // Delete image from Cloudinary if it exists
        if (recipe.imageUrl) {
            const deleteResult = await deleteImageFromCloudinary(recipe.imageUrl);
            if (!deleteResult.success) {
                console.warn('Warning: Failed to delete image from Cloudinary:', deleteResult.message);
                // Continue with recipe deletion even if image deletion fails
            }
        }

        // Delete the recipe from database
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
