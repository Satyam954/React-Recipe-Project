import React from "react";
import { Link } from "react-router-dom";

function NotfoundPage() {
  return (
    <main className="min-h-[70vh] max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <span className="text-8xl sm:text-9xl font-black font-serif tracking-tight text-accent/15 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl font-bold font-serif text-accent">
            404
          </span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
        Page Not Found
      </h1>
      <p className="text-muted max-w-md mx-auto mb-8 text-sm sm:text-base">
        The page you are looking for does not exist or might have been removed.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover active:scale-95 text-white rounded-xl px-6 py-3 font-medium text-sm shadow-md hover:shadow-lg transition-all"
      >
        <svg
          className="w-4 h-4 stroke-current fill-none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>
    </main>
  );
}

export default NotfoundPage;