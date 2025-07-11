const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config();

const sampleRecipes = [
    {
        title: "Classic Spaghetti Carbonara",
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and pepper. Simple yet incredibly flavorful.",
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale, diced",
            "4 large eggs",
            "100g Pecorino Romano cheese, grated",
            "50g Parmesan cheese, grated",
            "2 cloves garlic, minced",
            "Black pepper, freshly ground",
            "Salt to taste",
            "2 tbsp olive oil"
        ],
        directions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente.",
            "Meanwhile, heat olive oil in a large skillet over medium heat. Add pancetta and cook until crispy, about 5-7 minutes.",
            "In a bowl, whisk together eggs, Pecorino Romano, Parmesan, and black pepper.",
            "Reserve 1 cup of pasta cooking water, then drain the pasta.",
            "Add hot pasta to the skillet with pancetta. Remove from heat.",
            "Quickly pour the egg mixture over the pasta, tossing constantly to prevent scrambling.",
            "Add pasta water gradually until you achieve a creamy consistency.",
            "Serve immediately with extra cheese and black pepper."
        ],
        tip: "The key to perfect carbonara is to remove the pan from heat before adding the egg mixture to prevent scrambling. The residual heat will cook the eggs gently."
    },
    {
        title: "Quinoa Buddha Bowl",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "vegan",
        description: "A nutritious and colorful bowl packed with quinoa, fresh vegetables, and a tahini dressing. Perfect for a healthy lunch or dinner.",
        ingredients: [
            "1 cup quinoa, rinsed",
            "2 cups vegetable broth",
            "1 large sweet potato, cubed",
            "1 cup chickpeas, drained and rinsed",
            "2 cups baby spinach",
            "1 avocado, sliced",
            "1 cucumber, diced",
            "1 cup cherry tomatoes, halved",
            "1/4 cup pumpkin seeds",
            "2 tbsp tahini",
            "2 tbsp lemon juice",
            "1 tbsp maple syrup",
            "2 tbsp olive oil",
            "Salt and pepper to taste"
        ],
        directions: [
            "Preheat oven to 400°F (200°C).",
            "Toss cubed sweet potato with 1 tbsp olive oil, salt, and pepper. Roast for 25-30 minutes until tender.",
            "Cook quinoa in vegetable broth according to package directions. Let cool slightly.",
            "For dressing, whisk together tahini, lemon juice, maple syrup, remaining olive oil, salt, and pepper.",
            "Divide quinoa among bowls. Top with roasted sweet potato, chickpeas, spinach, avocado, cucumber, and tomatoes.",
            "Drizzle with tahini dressing and sprinkle with pumpkin seeds.",
            "Serve immediately."
        ],
        tip: "Prep all ingredients ahead of time for quick assembly during busy weekdays. The dressing can be stored in the fridge for up to a week."
    },
    {
        title: "Chocolate Chip Cookies",
        imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80.jpg",
        recipeType: "dessert",
        dietType: "vegetarian",
        description: "Soft, chewy chocolate chip cookies that are perfect for any occasion. A classic recipe that never goes out of style.",
        ingredients: [
            "2 1/4 cups all-purpose flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "1 cup butter, softened",
            "3/4 cup granulated sugar",
            "3/4 cup brown sugar, packed",
            "2 large eggs",
            "2 tsp vanilla extract",
            "2 cups chocolate chips"
        ],
        directions: [
            "Preheat oven to 375°F (190°C).",
            "In a bowl, whisk together flour, baking soda, and salt.",
            "In a large bowl, cream together softened butter and both sugars until light and fluffy.",
            "Beat in eggs one at a time, then add vanilla extract.",
            "Gradually mix in the flour mixture until just combined.",
            "Fold in chocolate chips.",
            "Drop rounded tablespoons of dough onto ungreased baking sheets, spacing 2 inches apart.",
            "Bake for 9-11 minutes until golden brown around edges.",
            "Cool on baking sheet for 5 minutes before transferring to wire rack."
        ],
        tip: "For extra chewy cookies, slightly underbake them. They'll continue cooking on the hot baking sheet after removal from the oven."
    },
    {
        title: "Greek Salad",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80.jpg",
        recipeType: "salad",
        dietType: "vegetarian",
        description: "Fresh and vibrant Greek salad with tomatoes, cucumbers, olives, and feta cheese. Light and refreshing.",
        ingredients: [
            "4 large tomatoes, cut into wedges",
            "2 cucumbers, sliced thick",
            "1 red onion, thinly sliced",
            "200g feta cheese, cubed",
            "1 cup Kalamata olives",
            "1/4 cup extra virgin olive oil",
            "2 tbsp red wine vinegar",
            "1 tsp dried oregano",
            "Salt and pepper to taste",
            "Fresh herbs for garnish"
        ],
        directions: [
            "Arrange tomato wedges and cucumber slices on a large platter.",
            "Scatter red onion slices over the vegetables.",
            "Add feta cheese cubes and olives.",
            "In a small bowl, whisk together olive oil, vinegar, oregano, salt, and pepper.",
            "Drizzle dressing over the salad.",
            "Garnish with fresh herbs and serve immediately."
        ],
        tip: "For best flavor, let the salad sit for 10-15 minutes after dressing to allow the flavors to meld together."
    },
    {
        title: "Banana Pancakes",
        imageUrl: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&q=80.jpg",
        recipeType: "breakfast",
        dietType: "vegetarian",
        description: "Fluffy banana pancakes perfect for weekend breakfast. Naturally sweet and delicious.",
        ingredients: [
            "2 ripe bananas, mashed",
            "2 large eggs",
            "1/4 cup milk",
            "1 cup all-purpose flour",
            "2 tbsp sugar",
            "2 tsp baking powder",
            "1/2 tsp salt",
            "1/2 tsp vanilla extract",
            "2 tbsp butter, melted",
            "Butter for cooking",
            "Maple syrup for serving"
        ],
        directions: [
            "In a large bowl, mash bananas until smooth.",
            "Whisk in eggs, milk, and vanilla extract.",
            "In another bowl, combine flour, sugar, baking powder, and salt.",
            "Add dry ingredients to wet ingredients and stir until just combined.",
            "Fold in melted butter.",
            "Heat a griddle or large skillet over medium heat and butter lightly.",
            "Pour 1/4 cup batter for each pancake.",
            "Cook until bubbles form on surface, then flip and cook until golden brown.",
            "Serve hot with maple syrup."
        ],
        tip: "Don't overmix the batter - a few lumps are fine and will result in fluffier pancakes."
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing recipes
        await Recipe.deleteMany({});
        console.log('🧹 Cleared existing recipes');

        // Insert sample recipes
        const insertedRecipes = await Recipe.insertMany(sampleRecipes);
        console.log(`✅ Inserted ${insertedRecipes.length} sample recipes`);

        console.log('🎉 Database seeding completed successfully!');
        console.log('\nSample recipes added:');
        insertedRecipes.forEach((recipe, index) => {
            console.log(`${index + 1}. ${recipe.title} (${recipe.recipeType} - ${recipe.dietType})`);
        });

        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
