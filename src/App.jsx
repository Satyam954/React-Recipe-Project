import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import RecipeDetailpage from "./pages/RecipeDetailpage";
import NotfoundPage from "./pages/NotfoundPage";



function App() {
  return <div className="min-h-screen bg-background text-text font-sans">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/recipe/:id" element={<RecipeDetailpage/>}/>
      <Route path="*" element={<NotfoundPage/>}/>
    </Routes>
  </div>;
}

export default App;
