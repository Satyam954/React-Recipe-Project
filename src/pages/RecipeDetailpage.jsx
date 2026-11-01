import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetailpage() {
  let [recipe, setRecipe] = useState({});
  let [loading, setLoading] = useState(true);
  let [errorMsg, setErroMesg] = useState("");

  const { id } = useParams();

  async function fethrecipe() {
    try {
      let { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
      setRecipe(data);
    } catch (error) {
      setErroMesg("Could not load recipe details. Pleasr try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fethrecipe();
  }, []);

  if (errorMsg) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] px-4 py-16">
        <div className="flex flex-col items-center gap-5 max-w-md text-center p-8 bg-card border border-border rounded-2xl shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
            <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-text mb-2">Recipe Not Found</h2>
            <p className="text-muted text-sm">{errorMsg}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl bg-accent hover:bg-accent-hover text-white transition-all shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <p className="text-muted text-sm font-medium animate-pulse">Loading recipe details...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      <Link
        to="/"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors mb-6"
      >
        <svg
          className="w-4 h-4 stroke-current fill-none transition-transform group-hover:-translate-x-1"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl border border-border shadow-md">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-80 sm:h-96 md:h-full max-h-[460px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent/10 text-accent">
              {recipe.cuisine}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted/15 text-muted capitalize">
              {recipe.difficulty}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-text mb-3 leading-tight">
            {recipe.name}
          </h1>

       
          <div className="flex items-center gap-1.5 mb-6 font-semibold text-amber-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-text text-sm">
              {recipe.rating} <span className="text-muted font-normal">({recipe.reviewCount} reviews)</span>
            </span>
          </div>

        
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-border mb-6">
            <div className="bg-card/70 border border-border/70 p-3 rounded-xl text-center">
              <span className="block text-[11px] text-muted uppercase font-semibold">Prep time</span>
              <span className="text-sm font-bold text-text">{recipe.prepTimeMinutes} mins</span>
            </div>
            <div className="bg-card/70 border border-border/70 p-3 rounded-xl text-center">
              <span className="block text-[11px] text-muted uppercase font-semibold">Cook time</span>
              <span className="text-sm font-bold text-text">{recipe.cookTimeMinutes} mins</span>
            </div>
            <div className="bg-card/70 border border-border/70 p-3 rounded-xl text-center">
              <span className="block text-[11px] text-muted uppercase font-semibold">Servings</span>
              <span className="text-sm font-bold text-text">{recipe.servings}</span>
            </div>
            <div className="bg-card/70 border border-border/70 p-3 rounded-xl text-center">
              <span className="block text-[11px] text-muted uppercase font-semibold">Calories</span>
              <span className="text-sm font-bold text-text">{recipe.caloriesPerServing} kcal</span>
            </div>
          </div>

       
          <div className="space-y-1.5 text-sm text-muted">
            <p>
              <strong className="text-text font-medium">Meal Type:</strong> {recipe?.mealType?.join(", ")}
            </p>
            <p>
              <strong className="text-text font-medium">Tags:</strong> {recipe?.tags?.join(", ")}
            </p>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-10">
        {/* Ingredients Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-text mb-5 flex items-center gap-2">
            <span>Ingredients</span>
          </h2>
          <ul className="space-y-3">
            {recipe.ingredients?.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-text/90">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-text mb-5 flex items-center gap-2">
            <span>Instructions</span>
          </h2>
          <ol className="space-y-4">
            {recipe.instructions?.map((step, index) => (
              <li key={index} className="flex items-start gap-3.5 text-sm sm:text-base text-text/90">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent font-bold text-xs shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetailpage;