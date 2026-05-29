'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 max-w-md">
        <h1 className="text-4xl font-black text-gray-200 mb-4">Oops!</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-500 mb-8">
          An unexpected error occurred. Please try again or contact support.
        </p>
        <button
          onClick={reset}
          className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
