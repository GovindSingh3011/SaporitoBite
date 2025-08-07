import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Recipes from "./pages/AllRecipes";
import Home from "./pages/Home";
import RecipeTypePage from './pages/RecipeTypePage';
import Recipe from './pages/Recipe';

function App() {
  return (
    <div className="font-serif">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/type/:type" element={<RecipeTypePage />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
