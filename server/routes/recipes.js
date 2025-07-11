const express = require('express');
const {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

const router = express.Router();

// @route   GET /api/recipes
// @desc    Get all recipes with optional filtering and pagination
// @access  Public
router.get('/', getRecipes);

// @route   GET /api/recipes/:id
// @desc    Get single recipe by ID
// @access  Public
router.get('/:id', getRecipe);

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Public
router.post('/', createRecipe);

// @route   PUT /api/recipes/:id
// @desc    Update recipe by ID
// @access  Public
router.put('/:id', updateRecipe);

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe by ID
// @access  Public
router.delete('/:id', deleteRecipe);

module.exports = router;
