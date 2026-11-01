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
    setLoading(true)
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (qurey) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${qurey}`;
      }
      const { data } = await axios.get(url);
      console.log(data);

      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-accent text-center">Please try again later</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 max-w-md mx-auto mb-8"
      >
        <input
          type="text"
          name="qurey"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>

    {loading && <p className="text-accent text-center">Loading...</p>}
      {!loading && recipes.length === 0 && (
        <p className="text-accent text-center">{`No data found for '${searchQurey}'`}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              fetchrecipies(recipes.length, searchQurey);
            }}
            type="button"
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Homepage;
