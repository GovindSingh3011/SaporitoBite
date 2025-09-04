import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Recipes from "./pages/AllRecipes";
import Home from "./pages/Home";
import RecipeTypePage from "./pages/RecipeTypePage";
import Recipe from "./pages/Recipe";
import UnsubscribeForm from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Cookbook from "./pages/Cookbook";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RecipeForm from "./pages/RecipeForm";
import AuthRoute from "./components/AuthRoute"; // <-- import

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/new-recipe"
            element={
              <AuthRoute>
                <RecipeForm />
              </AuthRoute>
            }
          />
          <Route
            path="/edit-recipe/:id"
            element={
              <AuthRoute>
                <RecipeForm />
              </AuthRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
