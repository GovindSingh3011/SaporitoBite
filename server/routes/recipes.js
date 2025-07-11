const express = require('express');
const {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - Only chef and admin can create/update/delete recipes
router.post('/', protect, authorize('chef', 'admin'), createRecipe);
router.put('/:id', protect, authorize('chef', 'admin'), updateRecipe);
router.delete('/:id', protect, authorize('chef', 'admin'), deleteRecipe);

module.exports = router;
