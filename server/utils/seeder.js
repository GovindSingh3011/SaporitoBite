const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
require('dotenv').config();

// Sample users data
const sampleUsers = [
    {
        name: "Admin Master",
        email: "admin@spoonsage.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Chef Gordon",
        email: "gordon@spoonsage.com",
        password: "chef123",
        role: "chef"
    },
    {
        name: "Chef Julia",
        email: "julia@spoonsage.com",
        password: "chef123",
        role: "chef"
    }
];

// Sample recipes data (will be assigned to users)
const sampleRecipes = [
    // Admin's recipes
    {
        title: "Premium Wagyu Steak",
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "Premium wagyu steak cooked to perfection with garlic butter and fresh herbs. A luxury dining experience.",
        ingredients: [
            "300g wagyu steak",
            "2 tbsp olive oil",
            "3 cloves garlic, minced",
            "2 tbsp butter",
            "Fresh thyme sprigs",
            "Fresh rosemary",
            "Salt and black pepper",
            "1 tbsp balsamic vinegar"
        ],
        directions: [
            "Let steak come to room temperature for 30 minutes.",
            "Season generously with salt and pepper.",
            "Heat olive oil in a cast iron skillet over high heat.",
            "Sear steak for 2-3 minutes per side for medium-rare.",
            "Add butter, garlic, and herbs to pan.",
            "Baste steak with aromatic butter.",
            "Rest for 5 minutes before serving.",
            "Drizzle with balsamic vinegar."
        ],
        tip: "Use a meat thermometer for perfect doneness - 130°F for medium-rare.",
        userType: "admin"
    },
    {
        title: "Truffle Risotto",
        imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "vegetarian",
        description: "Creamy arborio risotto infused with truffle oil and topped with fresh parmesan. An elegant Italian classic.",
        ingredients: [
            "300g arborio rice",
            "1L warm vegetable stock",
            "1 onion, finely diced",
            "3 cloves garlic, minced",
            "120ml white wine",
            "50g parmesan cheese, grated",
            "2 tbsp truffle oil",
            "2 tbsp butter",
            "Salt and white pepper",
            "Fresh parsley for garnish"
        ],
        directions: [
            "Heat stock in a separate pan and keep warm.",
            "Sauté onion and garlic in butter until translucent.",
            "Add rice and stir for 2 minutes until coated.",
            "Pour in wine and stir until absorbed.",
            "Add stock one ladle at a time, stirring constantly.",
            "Continue for 18-20 minutes until rice is creamy.",
            "Stir in parmesan and truffle oil.",
            "Season and garnish with parsley."
        ],
        tip: "Constant stirring is key to releasing the rice's starch for creaminess.",
        userType: "admin"
    },

    // Chef Gordon's recipes
    {
        title: "Gordon's Beef Wellington",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "Classic Beef Wellington with mushroom duxelles wrapped in golden puff pastry. A true culinary masterpiece.",
        ingredients: [
            "800g beef tenderloin",
            "500g puff pastry",
            "300g mushrooms, finely chopped",
            "200g pâté de foie gras",
            "8 slices prosciutto",
            "2 egg yolks for wash",
            "2 tbsp Dijon mustard",
            "2 tbsp olive oil",
            "Fresh thyme",
            "Salt and pepper"
        ],
        directions: [
            "Sear beef on all sides until golden brown.",
            "Brush with mustard and let cool.",
            "Sauté mushrooms until moisture evaporates.",
            "Lay out prosciutto on plastic wrap.",
            "Spread mushroom mixture over prosciutto.",
            "Place beef on top and wrap tightly.",
            "Wrap in pastry and seal edges.",
            "Brush with egg wash and bake at 400°F for 25-30 minutes."
        ],
        tip: "Rest the beef for 10 minutes before slicing to retain juices.",
        userType: "chef1"
    },
    {
        title: "Gordon's Fish and Chips",
        imageUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "Crispy beer-battered fish with perfectly seasoned chips. A British classic done right.",
        ingredients: [
            "4 white fish fillets",
            "300g plain flour",
            "330ml cold beer",
            "1kg potatoes for chips",
            "Oil for deep frying",
            "1 tsp baking powder",
            "Salt and pepper",
            "Malt vinegar",
            "Mushy peas for serving"
        ],
        directions: [
            "Cut potatoes into thick chips and soak in water.",
            "Make batter with flour, beer, and baking powder.",
            "Heat oil to 350°F.",
            "Fry chips until golden, drain and season.",
            "Dip fish in batter and fry until crispy.",
            "Serve immediately with chips and mushy peas."
        ],
        tip: "Double-fry the chips for extra crispiness - once at lower temp, then high.",
        userType: "chef1"
    },
    {
        title: "Spicy Lamb Curry",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "Aromatic lamb curry with bold spices and rich coconut milk. Perfect with basmati rice.",
        ingredients: [
            "800g lamb shoulder, cubed",
            "400ml coconut milk",
            "2 onions, sliced",
            "4 cloves garlic",
            "2 inch ginger piece",
            "2 tbsp curry powder",
            "1 tbsp garam masala",
            "400g canned tomatoes",
            "2 tbsp vegetable oil",
            "Fresh coriander",
            "Basmati rice for serving"
        ],
        directions: [
            "Brown lamb pieces in batches.",
            "Sauté onions until golden.",
            "Add garlic, ginger, and spices.",
            "Add tomatoes and cook until reduced.",
            "Return lamb to pot with coconut milk.",
            "Simmer for 1.5 hours until tender.",
            "Garnish with fresh coriander.",
            "Serve with fluffy basmati rice."
        ],
        tip: "Marinate lamb in yogurt and spices overnight for deeper flavor.",
        userType: "chef1"
    },

    // Chef Julia's recipes  
    {
        title: "Julia's Coq au Vin",
        imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&q=80.jpg",
        recipeType: "main-course",
        dietType: "non-vegetarian",
        description: "Classic French chicken braised in red wine with vegetables. A timeless Julia Child recipe.",
        ingredients: [
            "1 whole chicken, cut into pieces",
            "750ml red wine",
            "200g bacon, diced",
            "12 pearl onions",
            "250g mushrooms",
            "3 tbsp flour",
            "2 tbsp brandy",
            "2 bay leaves",
            "Fresh thyme",
            "Butter for finishing",
            "Salt and pepper"
        ],
        directions: [
            "Render bacon fat and brown chicken pieces.",
            "Flambé with brandy.",
            "Add wine, herbs, and vegetables.",
            "Braise covered for 45 minutes.",
            "Remove chicken and reduce sauce.",
            "Thicken with butter and flour.",
            "Return chicken to sauce.",
            "Serve with crusty bread."
        ],
        tip: "Use a good quality wine that you would drink - it makes all the difference.",
        userType: "chef2"
    },
    {
        title: "French Onion Soup",
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80.jpg",
        recipeType: "soup",
        dietType: "vegetarian",
        description: "Rich caramelized onion soup topped with gruyere cheese and toasted baguette slices.",
        ingredients: [
            "6 large onions, thinly sliced",
            "1.5L beef or vegetable stock",
            "120ml dry white wine",
            "100g gruyere cheese, grated",
            "4 thick baguette slices",
            "3 tbsp butter",
            "1 tbsp olive oil",
            "1 tsp sugar",
            "2 bay leaves",
            "Fresh thyme",
            "Salt and pepper"
        ],
        directions: [
            "Slowly caramelize onions in butter and oil for 45 minutes.",
            "Add sugar to help browning.",
            "Deglaze with wine.",
            "Add stock and herbs, simmer 30 minutes.",
            "Toast baguette slices.",
            "Ladle soup into bowls.",
            "Top with bread and cheese.",
            "Broil until cheese is bubbly."
        ],
        tip: "Patience is key - properly caramelized onions take time but are worth it.",
        userType: "chef2"
    },
    {
        title: "Classic Crème Brûlée",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80.jpg",
        recipeType: "dessert",
        dietType: "vegetarian",
        description: "Silky vanilla custard topped with caramelized sugar. The perfect French dessert.",
        ingredients: [
            "500ml heavy cream",
            "6 egg yolks",
            "100g caster sugar",
            "1 vanilla bean",
            "Extra sugar for caramelizing",
            "Pinch of salt"
        ],
        directions: [
            "Heat cream with vanilla bean until almost boiling.",
            "Whisk egg yolks with sugar until pale.",
            "Slowly add hot cream to egg mixture.",
            "Strain and divide between ramekins.",
            "Bake in water bath at 325°F for 30-35 minutes.",
            "Chill for at least 2 hours.",
            "Sprinkle with sugar and caramelize with torch.",
            "Serve immediately."
        ],
        tip: "The custard should jiggle slightly when gently shaken - that's perfect doneness.",
        userType: "chef2"
    },
    {
        title: "Ratatouille Provence",
        imageUrl: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=500&q=80.jpg",
        recipeType: "side-dish",
        dietType: "vegan",
        description: "Traditional French vegetable stew with eggplant, zucchini, tomatoes, and herbs de Provence.",
        ingredients: [
            "1 large eggplant, diced",
            "2 zucchini, sliced",
            "2 bell peppers, chunked",
            "4 tomatoes, chopped",
            "1 onion, sliced",
            "4 cloves garlic, minced",
            "1/4 cup olive oil",
            "2 tbsp herbs de Provence",
            "Fresh basil leaves",
            "Salt and pepper",
            "Balsamic vinegar"
        ],
        directions: [
            "Salt eggplant and let drain for 30 minutes.",
            "Sauté onion and garlic until fragrant.",
            "Add eggplant and cook until softened.",
            "Add peppers and cook 10 minutes.",
            "Add tomatoes and herbs.",
            "Simmer covered for 30 minutes.",
            "Add zucchini in last 10 minutes.",
            "Finish with fresh basil and balsamic."
        ],
        tip: "Let it rest overnight - ratatouille tastes even better the next day.",
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
        const chef1User = createdUsers.find(user => user.email === 'gordon@spoonsage.com');
        const chef2User = createdUsers.find(user => user.email === 'julia@spoonsage.com');

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
        console.log('Admin: admin@spoonsage.com / admin123');
        console.log('Chef Gordon: gordon@spoonsage.com / chef123');
        console.log('Chef Julia: julia@spoonsage.com / chef123');

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
