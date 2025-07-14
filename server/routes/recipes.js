const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    getRecipes,
    getRecipe,
    getMyRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Private routes
router.get('/my-recipes', protect, authorize('chef', 'admin'), getMyRecipes);
router.post('/', protect, authorize('chef', 'admin'), upload.single('image'), createRecipe);
router.put('/:id', protect, authorize('chef', 'admin'), upload.single('image'), updateRecipe);
router.delete('/:id', protect, authorize('chef', 'admin'), deleteRecipe);

module.exports = router;
