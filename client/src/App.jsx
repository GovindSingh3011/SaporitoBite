import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Recipes from "./pages/AllRecipes";
import Home from "./pages/Home";
import RecipeTypePage from './pages/RecipeTypePage';
import Recipe from './pages/Recipe';
import UnsubscribeForm from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Cookbook from "./pages/Cookbook";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/type/:type" element={<RecipeTypePage />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/unsubscribe" element={<UnsubscribeForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
