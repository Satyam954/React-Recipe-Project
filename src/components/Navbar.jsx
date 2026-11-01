import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-xs transition-all">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        <Link
          to="/"
          className="font-serif font-extrabold text-2xl tracking-tight text-accent hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          RecipeFinder
        </Link>

        <Link
          to="/"
          className="text-text hover:text-accent font-medium text-sm px-4 py-2 rounded-full hover:bg-accent/10 transition-colors"
        >
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;