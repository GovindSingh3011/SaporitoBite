import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const RecipeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(id ? true : false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Form state
    const [form, setForm] = useState({
        title: '',
        description: '',
        recipeTypes: [],
        dietTypes: [],
        ingredients: [''],
        directions: [''],
        tip: ''
    });

    // Separate state for the image file
    const [imageFile, setImageFile] = useState(null);

    // Recipe types and diet types available options
    const recipeTypeOptions = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'main-course', 'side-dish', 'salad', 'soup'];
    const dietTypeOptions = ['vegetarian', 'vegan', 'non-vegetarian', 'gluten-free', 'keto', 'paleo', 'dairy-free'];

    // Fetch recipe data if editing
    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return;

            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch recipe');
                }

                const recipe = await res.json();
                setForm({
                    title: recipe.title || '',
                    description: recipe.description || '',
                    recipeTypes: recipe.recipeTypes || [],
                    dietTypes: recipe.dietTypes || [],
                    ingredients: recipe.ingredients?.length ? recipe.ingredients : [''],
                    directions: recipe.directions?.length ? recipe.directions : [''],
                    tip: recipe.tip || ''
                });

                // Set image preview if there's an existing image
                if (recipe.imageUrl) {
                    setImagePreview(recipe.imageUrl);
                }
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError('Failed to load recipe. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Validate form
        if (!form.title || !form.description ||
            form.recipeTypes.length === 0 || form.dietTypes.length === 0 ||
            form.ingredients.some(i => !i) || form.directions.some(d => !d)) {
            setError('Please fill in all required fields');
            setSubmitting(false);
            return;
        }

        if (!imageFile && !imagePreview) {
            setError('Please upload an image for your recipe');
            setSubmitting(false);
            return;
        }

        try {
            // Create FormData object for multipart/form-data submission
            const formData = new FormData();

            // Add text fields
            formData.append('title', form.title);
            formData.append('description', form.description);

            // Add arrays
            form.recipeTypes.forEach(type => {
                formData.append('recipeTypes', type);
            });

            form.dietTypes.forEach(type => {
                formData.append('dietTypes', type);
            });

            form.ingredients.filter(i => i.trim()).forEach(ingredient => {
                formData.append('ingredients', ingredient);
            });

            form.directions.filter(d => d.trim()).forEach(direction => {
                formData.append('directions', direction);
            });

            if (form.tip) {
                formData.append('tip', form.tip);
            }

            // Add image file if a new one is selected
            if (imageFile) {
                formData.append('image', imageFile);
            } else if (imagePreview && id) {
                // If editing and using existing image, pass the URL
                formData.append('imageUrl', imagePreview);
            }

            const url = id
                ? `${BASE_URL}/api/recipes/${id}`
                : `${BASE_URL}/api/recipes`;

            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to save recipe');
            }

            const data = await res.json();
            setMessage(id ? 'Recipe updated successfully!' : 'Recipe created successfully!');

            // Navigate back to dashboard after a brief delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            console.error('Error saving recipe:', err);
            setError(err.message || 'Failed to save recipe. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.match('image.*')) {
            setError('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image file is too large. Please select an image under 5MB.');
            return;
        }

        // Set the file for form submission
        setImageFile(file);

        // Create a preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Clear any existing error
        if (error) setError(null);
    };

    // Remove image
    const handleRemoveImage = () => {
        // Clear the image file
        setImageFile(null);
        // Clear the preview
        setImagePreview(null);
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Clear any errors
        if (error) setError(null);
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle array field changes (ingredients, directions)
    const handleArrayChange = (index, value, field) => {
        const newArray = [...form[field]];
        newArray[index] = value;
        setForm(prev => ({ ...prev, [field]: newArray }));
    };

    // Add new item to array fields
    const handleAddItem = (field) => {
        setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    // Remove item from array fields
    const handleRemoveItem = (index, field) => {
        if (form[field].length <= 1) return;
        const newArray = form[field].filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, [field]: newArray }));
    };

    // Handle checkbox changes (recipeTypes, dietTypes)
    const handleCheckboxChange = (value, field) => {
        const currentValues = [...form[field]];
        if (currentValues.includes(value)) {
            // Remove if already selected
            setForm(prev => ({
                ...prev,
                [field]: prev[field].filter(item => item !== value)
            }));
        } else {
            // Add if not selected
            setForm(prev => ({
                ...prev,
                [field]: [...prev[field], value]
            }));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bfa074]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-serif text-[#a8844a] mb-6">
                    {id ? 'Edit Recipe' : 'Create New Recipe'}
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                    Recipe Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] sm:text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Recipe Image *
                                </label>
                                <div className="mt-1 flex flex-col items-center space-y-2">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Recipe preview"
                                                className="h-64 w-full object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none"
                                                title="Remove image"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="text-sm text-gray-600">
                                                    <label
                                                        htmlFor="image-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#bfa074] hover:text-[#a8844a]"
                                                    >
                                                        <span>Upload an image</span>
                                                        <input
                                                            id="image-upload"
                                                            name="image-upload"
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                                            className="sr-only"
                                                            onChange={handleImageChange}
                                                            ref={fileInputRef}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, JPEG up to 5MB
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Create a new file input and trigger it
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/jpeg,image/png,image/jpg,image/webp';
                                                input.onchange = (e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        handleImageChange(e);
                                                    }
                                                };
                                                input.click();
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-[#bfa074] text-sm leading-4 font-medium rounded-md text-[#a8844a] bg-white hover:bg-gray-50 cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Change Image
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recipe Types and Diet Types */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Recipe Classification</h2>

                        {/* Recipe Types */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Recipe Types * (Select at least one)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {recipeTypeOptions.map(type => (
                                    <div key={type} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`recipeType-${type}`}
                                            checked={form.recipeTypes.includes(type)}
                                            onChange={() => handleCheckboxChange(type, 'recipeTypes')}
                                            className="h-4 w-4 text-[#bfa074] focus:ring-[#bfa074] border-gray-300 rounded"
                                        />
                                        <label htmlFor={`recipeType-${type}`} className="ml-2 block text-sm text-gray-700 capitalize">
                                            {type.replace('-', ' ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Diet Types */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Diet Types * (Select at least one)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {dietTypeOptions.map(type => (
                                    <div key={type} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`dietType-${type}`}
                                            checked={form.dietTypes.includes(type)}
                                            onChange={() => handleCheckboxChange(type, 'dietTypes')}
                                            className="h-4 w-4 text-[#bfa074] focus:ring-[#bfa074] border-gray-300 rounded"
                                        />
                                        <label htmlFor={`dietType-${type}`} className="ml-2 block text-sm text-gray-700 capitalize">
                                            {type.replace('-', ' ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Ingredients</h2>

                        {form.ingredients.map((ingredient, index) => (
                            <div key={`ingredient-${index}`} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                                    placeholder="e.g., 2 cups all-purpose flour"
                                    className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index, 'ingredients')}
                                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                                    title="Remove ingredient"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddItem('ingredients')}
                            className="mt-2 inline-flex items-center px-3 py-2 border border-[#bfa074] text-sm leading-4 font-medium rounded-md text-[#a8844a] bg-white hover:bg-gray-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Ingredient
                        </button>
                    </div>

                    {/* Directions */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Directions</h2>

                        {form.directions.map((direction, index) => (
                            <div key={`direction-${index}`} className="flex items-start mb-4">
                                <div className="flex-shrink-0 pt-2">
                                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#bfa074] text-white text-sm font-medium">
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="ml-3 flex-grow">
                                    <textarea
                                        rows={2}
                                        value={direction}
                                        onChange={(e) => handleArrayChange(index, e.target.value, 'directions')}
                                        placeholder="Describe this step..."
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index, 'directions')}
                                        className="mt-1 text-red-600 hover:text-red-800 text-sm flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Remove Step
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddItem('directions')}
                            className="mt-2 inline-flex items-center px-3 py-2 border border-[#bfa074] text-sm leading-4 font-medium rounded-md text-[#a8844a] bg-white hover:bg-gray-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Step
                        </button>
                    </div>

                    {/* Cooking Tip */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Cooking Tip (Optional)</h2>

                        <textarea
                            name="tip"
                            id="tip"
                            rows={3}
                            value={form.tip}
                            onChange={handleChange}
                            placeholder="Share a useful tip for making this recipe..."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] sm:text-sm"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#bfa074] hover:bg-[#a8844a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bfa074] disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : id ? 'Update Recipe' : 'Create Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
