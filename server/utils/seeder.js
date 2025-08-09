const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
require('dotenv').config();

// Sample users data
const sampleUsers = [
    {
        name: "Admin Master",
        email: "admin@saporitobite.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Chef Gordon",
        email: "gordon@saporitobite.com",
        password: "chef123",
        role: "chef"
    },
    {
        name: "Chef Julia",
        email: "julia@saporitobite.com",
        password: "chef123",
        role: "chef"
    }
];

// Sample recipes data (will be assigned to users)
const sampleRecipes = [
    {
        title: "Sous Vide Ribeye with Chimichurri",
        imageUrl: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        recipeTypes: ["main-course"],
        dietTypes: ["non-vegetarian"],
        description: "Perfectly cooked ribeye steak using the sous vide method, finished with a sear and topped with fresh chimichurri sauce.",
        ingredients: [
            "2 ribeye steaks (1.5 inches thick)",
            "4 garlic cloves, smashed",
            "4 sprigs fresh rosemary",
            "3 tbsp olive oil",
            "2 tbsp butter",
            "Salt and black pepper",
            "1 cup fresh parsley, chopped",
            "1/4 cup fresh oregano",
            "3 tbsp red wine vinegar",
            "1/2 cup olive oil",
            "2 garlic cloves, minced",
            "1 small red chili, deseeded and minced"
        ],
        directions: [
            "Season steaks generously with salt and pepper.",
            "Place steaks in vacuum seal bags with garlic and rosemary.",
            "Sous vide at 129°F (54°C) for 2 hours.",
            "Remove steaks and pat completely dry.",
            "Heat skillet until smoking hot, add oil.",
            "Sear steaks 45 seconds per side until browned.",
            "Add butter and baste steaks briefly.",
            "For chimichurri, combine herbs, garlic, chili, vinegar, and oil.",
            "Rest steaks 5 minutes, then slice against grain.",
            "Serve topped with chimichurri sauce."
        ],
        tip: "For the best crust, make sure steaks are completely dry before searing and use a cast iron pan.",
        userType: "admin"
    },
    {
        title: "Thai Coconut Curry Ramen",
        imageUrl: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
        recipeTypes: ["soup"],
        dietTypes: ["vegetarian"],
        description: "A fusion dish combining the richness of Thai coconut curry with Japanese ramen noodles. Aromatic, creamy, and deeply satisfying.",
        ingredients: [
            "200g ramen noodles",
            "400ml coconut milk",
            "600ml vegetable broth",
            "3 tbsp red curry paste",
            "2 tbsp soy sauce",
            "1 tbsp brown sugar",
            "1 tbsp lime juice",
            "2 tbsp vegetable oil",
            "1 block tofu, cubed and pressed",
            "2 bok choy, quartered",
            "200g mushrooms, sliced",
            "2 carrots, julienned",
            "Fresh cilantro, bean sprouts, lime wedges for garnish"
        ],
        directions: [
            "Press tofu for 30 minutes, then cube and pan-fry until golden.",
            "In a large pot, heat oil and fry curry paste until fragrant.",
            "Add coconut milk and broth, bring to gentle simmer.",
            "Stir in soy sauce, sugar, and lime juice.",
            "Add mushrooms and carrots, simmer 5 minutes.",
            "Cook ramen noodles according to package in separate pot.",
            "Add bok choy to curry broth for final 2 minutes.",
            "Divide noodles between bowls, ladle over curry broth.",
            "Top with tofu and garnishes."
        ],
        tip: "Don't overcook the bok choy - it should retain some crunch for textural contrast.",
        userType: "admin"
    },
    {
        title: "Lobster Ravioli with Saffron Cream",
        imageUrl: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
        recipeTypes: ["main-course"],
        dietTypes: ["non-vegetarian"],
        description: "Handmade pasta pillows filled with succulent lobster meat, served with a luxurious saffron cream sauce.",
        ingredients: [
            "For pasta dough:",
            "300g '00' flour",
            "3 large eggs",
            "1 tbsp olive oil",
            "Pinch of salt",
            "For filling:",
            "300g cooked lobster meat, chopped",
            "100g ricotta cheese",
            "Zest of 1 lemon",
            "2 tbsp chives, finely chopped",
            "For sauce:",
            "250ml heavy cream",
            "Large pinch saffron threads",
            "50ml white wine",
            "2 shallots, finely diced",
            "30g cold butter, cubed"
        ],
        directions: [
            "Make pasta dough: mix flour and salt, create well, add eggs and oil.",
            "Knead until smooth, wrap and rest for 30 minutes.",
            "Mix lobster, ricotta, lemon zest, and chives for filling.",
            "Roll pasta into thin sheets.",
            "Place teaspoons of filling, cover with second sheet, cut into ravioli.",
            "For sauce: infuse saffron in warm cream for 20 minutes.",
            "Sauté shallots in butter, add wine, reduce by half.",
            "Add saffron cream, simmer until slightly thickened.",
            "Boil ravioli for 2-3 minutes until al dente.",
            "Finish sauce with cold butter, season, and coat ravioli."
        ],
        tip: "Keep the pasta sheets covered while working to prevent them from drying out.",
        userType: "chef1"
    },
    {
        title: "Bourbon Glazed Short Ribs",
        imageUrl: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
        recipeTypes: ["main-course"],
        dietTypes: ["non-vegetarian"],
        description: "Melt-in-your-mouth beef short ribs braised for hours and finished with a sticky bourbon glaze. Pure comfort food elegance.",
        ingredients: [
            "2kg beef short ribs",
            "2 tbsp vegetable oil",
            "2 onions, roughly chopped",
            "3 carrots, roughly chopped",
            "3 celery stalks, roughly chopped",
            "4 garlic cloves, crushed",
            "2 tbsp tomato paste",
            "750ml beef stock",
            "250ml bourbon whiskey",
            "60ml maple syrup",
            "2 tbsp soy sauce",
            "2 bay leaves",
            "Fresh thyme sprigs",
            "2 star anise"
        ],
        directions: [
            "Season ribs generously with salt and pepper.",
            "Brown ribs on all sides in hot oil, remove and set aside.",
            "In same pot, sauté vegetables until softened.",
            "Add tomato paste, cook until darkened.",
            "Return ribs to pot, add stock, half the bourbon, herbs, and spices.",
            "Cover and braise in 325°F oven for 3-3.5 hours until tender.",
            "Remove ribs, strain braising liquid and reduce by half.",
            "Add remaining bourbon, maple syrup, and soy sauce.",
            "Reduce until thick and glossy.",
            "Return ribs to glaze, turning to coat completely."
        ],
        tip: "For even more flavor, braise the ribs a day ahead and refrigerate overnight in the braising liquid before glazing.",
        userType: "chef1"
    },
    {
        title: "Tarte Tatin with Rosemary Caramel",
        imageUrl: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
        recipeTypes: ["dessert"],
        dietTypes: ["vegetarian"],
        description: "A sophisticated twist on the classic French upside-down apple tart, infused with aromatic rosemary caramel.",
        ingredients: [
            "6-8 firm apples (Braeburn or Granny Smith)",
            "1 sheet all-butter puff pastry",
            "150g granulated sugar",
            "50g butter",
            "2 sprigs fresh rosemary",
            "1 vanilla bean, split and seeds scraped",
            "Pinch of sea salt",
            "Crème fraîche, to serve"
        ],
        directions: [
            "Peel, halve, and core apples.",
            "In cast iron skillet, make dry caramel with sugar.",
            "Add butter, rosemary sprigs, vanilla, and salt.",
            "Remove from heat, remove rosemary (keep for garnish).",
            "Arrange apples curved-side down in caramel.",
            "Cook over medium heat for 15-20 minutes until apples soften.",
            "Roll pastry to fit skillet, place over apples, tuck edges.",
            "Bake at 375°F for 25-30 minutes until golden.",
            "Cool for 5 minutes, then invert onto serving plate.",
            "Garnish with reserved crisp rosemary and serve with crème fraîche."
        ],
        tip: "The key to a good tarte tatin is patience - let the caramel and apples cook properly before adding the pastry.",
        userType: "chef2"
    },
    {
        title: "Bouillabaisse with Rouille",
        imageUrl: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
        recipeTypes: ["soup"],
        dietTypes: ["non-vegetarian"],
        description: "The famous Provençal seafood stew from Marseille, served with traditional garlicky rouille sauce and crusty bread.",
        ingredients: [
            "For the stew:",
            "500g firm white fish (snapper, cod, halibut), cut into chunks",
            "250g mussels, cleaned",
            "250g large raw prawns",
            "2 tbsp olive oil",
            "1 fennel bulb, chopped",
            "1 leek, sliced",
            "1 onion, chopped",
            "4 garlic cloves, minced",
            "1 orange, zested",
            "Pinch of saffron threads",
            "1 bay leaf",
            "2 tsp fresh thyme leaves",
            "400g canned tomatoes",
            "1L fish stock",
            "120ml dry white wine",
            "For the rouille:",
            "2 garlic cloves",
            "1 red pepper, roasted and peeled",
            "1 slice bread, crusts removed",
            "1 egg yolk",
            "150ml olive oil",
            "Pinch of saffron",
            "Crusty bread to serve"
        ],
        directions: [
            "In large pot, sauté fennel, leek, and onion until soft.",
            "Add garlic, orange zest, saffron, bay leaf, and thyme.",
            "Pour in wine, reduce by half.",
            "Add tomatoes and fish stock, simmer 15 minutes.",
            "For rouille: blend garlic, roasted pepper, soaked bread, saffron.",
            "Slowly add oil to make mayonnaise-like sauce.",
            "Add firm fish to stew, simmer 3 minutes.",
            "Add prawns and mussels, cover and cook until shells open.",
            "Discard any unopened mussels.",
            "Serve in bowls with rouille-spread bread on the side."
        ],
        tip: "The quality of your fish stock is crucial - make your own if possible, or use a premium store-bought version.",
        userType: "chef2"
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

        // Clear existing data
        await Recipe.deleteMany({});
        await User.deleteMany({});
        console.log('🧹 Cleared existing recipes and users');

        // Create users
        const createdUsers = await User.create(sampleUsers);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Map user types to actual user IDs
        const adminUser = createdUsers.find(user => user.role === 'admin');
        const chef1User = createdUsers.find(user => user.email === 'gordon@saporitobite.com');
        const chef2User = createdUsers.find(user => user.email === 'julia@saporitobite.com');

        // Assign recipes to users
        const recipesWithUsers = sampleRecipes.map(recipe => {
            let createdBy;
            switch (recipe.userType) {
                case 'admin':
                    createdBy = adminUser._id;
                    break;
                case 'chef1':
                    createdBy = chef1User._id;
                    break;
                case 'chef2':
                    createdBy = chef2User._id;
                    break;
                default:
                    createdBy = adminUser._id;
            }

            // Remove userType field and add createdBy
            const { userType, ...recipeData } = recipe;
            return {
                ...recipeData,
                createdBy
            };
        });

        // Insert recipes
        const insertedRecipes = await Recipe.insertMany(recipesWithUsers);
        console.log(`✅ Inserted ${insertedRecipes.length} sample recipes`);

        console.log('🎉 Database seeding completed successfully!');
        console.log('\n👥 Created Users:');
        createdUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
        });

        console.log('\n🍽️ Sample recipes added:');
        console.log(`📋 Admin recipes (${adminUser.name}):`);
        const adminRecipes = insertedRecipes.filter(recipe =>
            recipe.createdBy.toString() === adminUser._id.toString()
        );
        adminRecipes.forEach(recipe => {
            console.log(`   • ${recipe.title} (${recipe.recipeType})`);
        });

        console.log(`👨‍🍳 Chef Gordon recipes (${chef1User.name}):`);
        const chef1Recipes = insertedRecipes.filter(recipe =>
            recipe.createdBy.toString() === chef1User._id.toString()
        );
        chef1Recipes.forEach(recipe => {
            console.log(`   • ${recipe.title} (${recipe.recipeType})`);
        });

        console.log(`👩‍🍳 Chef Julia recipes (${chef2User.name}):`);
        const chef2Recipes = insertedRecipes.filter(recipe =>
            recipe.createdBy.toString() === chef2User._id.toString()
        );
        chef2Recipes.forEach(recipe => {
            console.log(`   • ${recipe.title} (${recipe.recipeType})`);
        });

        console.log('\n🔑 Login Credentials:');
        console.log('Admin: admin@saporitobite.com / admin123');
        console.log('Chef Gordon: gordon@saporitobite.com / chef123');
        console.log('Chef Julia: julia@saporitobite.com / chef123');

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
