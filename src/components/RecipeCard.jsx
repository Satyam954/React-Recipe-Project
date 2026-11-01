import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const {
    id,
    name,
    image,
    cuisine,
    rating,
    difficulty,
    prepTimeMinutes,
    cookTimeMinutes,
  } = recipe;
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <Link
      to={`/recipe/${id}`}
      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-xl hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
    >
   
      <div className="relative h-52 w-full overflow-hidden bg-muted/20">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-md text-text shadow-xs">
            {cuisine}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted">
          <span className="capitalize">{difficulty} difficulty</span>
        </div>

        <h3 className="font-serif font-bold text-lg text-text group-hover:text-accent transition-colors line-clamp-1 mb-4">
          {name}
        </h3>

    
        <div className="mt-auto pt-3 border-t border-border flex justify-between items-center text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating}
          </span>

          <span className="flex items-center gap-1.5 text-muted font-medium bg-muted/10 px-2.5 py-1 rounded-full">
            <svg
              className="w-4 h-4 stroke-muted fill-none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {totalTime} mins
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
