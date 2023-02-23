import Link from "next/link";

function Navigation() {
  return (
    <div className="absolute w-full">
      <nav className="flex  items-center justify-center  py-4 px-8 text-white">
        <Link
          href="/"
          className="mx-6 text-xl font-bold transition duration-300 hover:text-slate-400"
        >
          Home
        </Link>

        <Link
          href="/create"
          className="mx-6 text-xl font-bold transition duration-300 hover:text-slate-400"
        >
          Create
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;
