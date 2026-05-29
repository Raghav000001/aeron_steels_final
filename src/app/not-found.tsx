import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 max-w-md">
        <h1 className="text-6xl font-black text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
