import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import ChangePasswordModal from './ChangePassword';

const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedRecipeType, setSelectedRecipeType] = useState('');
    const [selectedDietType, setSelectedDietType] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    // Recipe types and diet types for filtering
    const recipeTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'main-course', 'side-dish', 'salad', 'soup'];
    const dietTypes = ['vegetarian', 'vegan', 'non-vegetarian', 'gluten-free', 'keto', 'paleo', 'dairy-free'];

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Fetch user profile
                const userRes = await fetch(`${BASE_URL}/api/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!userRes.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await userRes.json();
                setUser(userData.user);

                // Fetch user's recipes
                const recipesRes = await fetch(`${BASE_URL}/api/recipes/my-recipes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!recipesRes.ok) {
                    throw new Error('Failed to fetch recipes');
                }

                const recipesData = await recipesRes.json();
                setRecipes(recipesData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);

                // If unauthorized, redirect to login
                if (err.message.includes('401') || err.message.includes('auth')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('userChanged'));
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('userChanged'));
        navigate('/login');
    };

    const handleRecipeTypeChange = (e) => {
        setSelectedRecipeType(e.target.value);
    };

    const handleDietTypeChange = (e) => {
        setSelectedDietType(e.target.value);
    };

    // Handle delete recipe
    const handleDeleteRecipe = async (recipeId) => {
        if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${BASE_URL}/api/recipes/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }

            // Remove the deleted recipe from state
            setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
        } catch (err) {
            console.error('Error deleting recipe:', err);
            alert('Failed to delete recipe. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Filter recipes based on filters
    const filteredRecipes = recipes.filter(recipe => {
        const matchesRecipeType = selectedRecipeType === '' ||
            (recipe.recipeTypes && recipe.recipeTypes.includes(selectedRecipeType));

        const matchesDietType = selectedDietType === '' ||
            (recipe.dietTypes && recipe.dietTypes.includes(selectedDietType));

        return matchesRecipeType && matchesDietType;
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bfa074]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 text-red-800 p-4 rounded-md max-w-md">
                    <h3 className="text-lg font-medium">Error loading dashboard</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded transition-colors"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-screen-xl">
            {/* Dashboard Header */}
            <div className="mb-6 sm:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-serif text-[#a8844a]">Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.name}</p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={handleLogout}
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6 md:space-x-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                            ? 'border-[#bfa074] text-[#a8844a]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('recipes')}
                        className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'recipes'
                            ? 'border-[#bfa074] text-[#a8844a]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        My Recipes
                    </button>
                </nav>
            </div>

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Account Information</h2>

                    <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Name</h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-900 break-words">{user.name}</p>
                            </div>

                            <div>
                                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Email</h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-900 break-words">{user.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Role</h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-900 capitalize">{user.role}</p>
                            </div>

                            <div>
                                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Member Since</h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-900">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 space-y-3">
                        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Account Actions</h2>

                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <button
                                onClick={() => setShowChangePassword(true)}
                                className="px-4 py-2 rounded bg-[#bfa074] text-white hover:bg-[#a8844a]"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recipes Tab Content */}
            {activeTab === 'recipes' && (
                <div>
                    {/* Filters and Add New Recipe */}
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-0">My Recipes</h2>
                            <Link
                                to="/new-recipe"
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-[#bfa074] hover:bg-[#a8844a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bfa074]"
                            >
                                Add New Recipe
                            </Link>
                        </div>

                        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {/* Recipe Type Filter */}
                            <div>
                                <label htmlFor="recipeType" className="block text-xs sm:text-sm font-medium text-gray-700">
                                    Recipe Type
                                </label>
                                <select
                                    id="recipeType"
                                    name="recipeType"
                                    value={selectedRecipeType}
                                    onChange={handleRecipeTypeChange}
                                    className="mt-1 block w-full pl-2 sm:pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] rounded-md"
                                >
                                    <option value="">All Recipe Types</option>
                                    {recipeTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Diet Type Filter */}
                            <div>
                                <label htmlFor="dietType" className="block text-xs sm:text-sm font-medium text-gray-700">
                                    Diet Type
                                </label>
                                <select
                                    id="dietType"
                                    name="dietType"
                                    value={selectedDietType}
                                    onChange={handleDietTypeChange}
                                    className="mt-1 block w-full pl-2 sm:pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-[#bfa074] focus:border-[#bfa074] rounded-md"
                                >
                                    <option value="">All Diet Types</option>
                                    {dietTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Recipe Grid */}
                    {filteredRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            {filteredRecipes.map((recipe) => (
                                <div key={recipe._id} className="relative group">
                                    <RecipeCard recipe={recipe} />
                                    {/* Mobile-friendly action buttons - always visible on touch devices */}
                                    <div className="sm:hidden absolute top-2 right-2 flex space-x-1">
                                        <Link
                                            to={`/edit-recipe/${recipe._id}`}
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                            title="Edit Recipe"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteRecipe(recipe._id)}
                                            disabled={isDeleting}
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-red-100"
                                            title="Delete Recipe"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Desktop hover buttons */}
                                    <div className="hidden sm:flex absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                                        <Link
                                            to={`/edit-recipe/${recipe._id}`}
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                            title="Edit Recipe"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteRecipe(recipe._id)}
                                            disabled={isDeleting}
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-red-100"
                                            title="Delete Recipe"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {recipes.length === 0
                                    ? "You haven't created any recipes yet."
                                    : "No recipes match your current filters."}
                            </p>
                            {recipes.length === 0 && (
                                <Link
                                    to="/new-recipe"
                                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-[#bfa074] hover:bg-[#a8844a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bfa074]"
                                >
                                    Create Your First Recipe
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Change Password Modal */}
            <ChangePasswordModal
                open={showChangePassword}
                onClose={() => setShowChangePassword(false)}
            />
        </div>
    );
};

export default Dashboard;
