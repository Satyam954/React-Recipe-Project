import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Homepage() {
  let [recipes, setRecipes] = useState([]);

  const [total, settotal] = useState(0);
  let [loading, setLoading] = useState(true);
  const [erroMsg, seterroeMsg] = useState("");
  const [searchQurey, setsearchQurey] = useState("");

  async function fetchrecipies(skipCount, qurey) {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (qurey) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${qurey}`;
      }
      const { data } = await axios.get(url);
      

      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes]
      );
      settotal(data.total);
    } catch (error) {
      seterroeMsg("Please try again later");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchrecipies(0);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let qurey = form.get("qurey").trim();

    setsearchQurey(qurey);
    fetchrecipies(0, qurey);
  }

  if (erroMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto p-6 bg-red-500/10 border border-red-500/20 rounded-2xl shadow-xs">
          <p className="text-red-600 dark:text-red-400 font-medium">Please try again later</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
    
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-text tracking-tight mb-3">
          Discover Delicious Recipes
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Explore mouth-watering recipes from all cuisines and cook your favorite dishes.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-12 shadow-sm focus-within:shadow-md transition-shadow"
      >
        <div className="flex gap-2 p-1.5 bg-card border border-border rounded-2xl focus-within:border-accent">
          <input
            type="text"
            name="qurey"
            placeholder="Search recipes, ingredients, or cuisines..."
            className="flex-1 bg-transparent px-4 py-2.5 text-text placeholder-muted outline-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover active:scale-95 text-white rounded-xl px-6 py-2.5 font-medium text-sm transition-all shadow-xs"
          >
            Search
          </button>
        </div>
      </form>

      
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          <p className="text-muted text-sm font-medium animate-pulse">Loading recipes...</p>
        </div>
      )}

     
      {!loading && recipes.length === 0 && (
        <div className="text-center py-16 px-4 bg-card border border-dashed border-border rounded-2xl max-w-md mx-auto">
          <p className="text-text font-semibold text-lg mb-1">No recipes found</p>
          <p className="text-muted text-sm">{`No results found for '${searchQurey}'. Try another search query!`}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>

   
      {recipes.length < total && (
        <div className="text-center mt-12 pb-4">
          <button
            onClick={() => {
              fetchrecipies(recipes.length, searchQurey);
            }}
            type="button"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover active:scale-95 text-white rounded-xl px-8 py-3.5 font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Load More Recipes</span>
            <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}

export default Homepage;