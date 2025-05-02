
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import our product category pages
import ColourLenses from "./pages/ProductCategories/ColourLenses";
import EyesightLens from "./pages/ProductCategories/EyesightLens";
import TravelKits from "./pages/ProductCategories/TravelKits";
// Import our new wishlist page
import Wishlist from "./pages/Wishlist";
// Import our new search page
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/colour-lenses" element={<ColourLenses />} />
          <Route path="/products/eyesight-lens" element={<EyesightLens />} />
          <Route path="/products/travel-kits" element={<TravelKits />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
