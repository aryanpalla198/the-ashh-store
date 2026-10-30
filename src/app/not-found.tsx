import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-neutral-50">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-[#E11B23] font-black text-3xl mb-4">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-black uppercase text-zinc-900 tracking-tight">
        Drop Not Found
      </h1>
      <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-sm">
        The streetwear page or merchandise drop you are looking for has moved or sold out.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition"
      >
        Back to Home Base
      </Link>
    </div>
  );
}
