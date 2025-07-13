const express = require('express');
const {
    getRecipes,
    getRecipe,
    getMyRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - Both chef and admin can access
router.get('/my-recipes', protect, authorize('chef', 'admin'), getMyRecipes);
router.post('/', protect, authorize('chef', 'admin'), createRecipe);
router.put('/:id', protect, authorize('chef', 'admin'), updateRecipe);
router.delete('/:id', protect, authorize('chef', 'admin'), deleteRecipe);

module.exports = router;
