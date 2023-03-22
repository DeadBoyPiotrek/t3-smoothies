import Link from "next/link";

export function Navigation() {
  return (
    <div className="absolute w-full">
      <nav className="flex items-center justify-center gap-3  py-4 px-8 text-white">
        <Link href="/" className="btn">
          Home
        </Link>
        <Link href="/create" className="btn">
          Create
        </Link>
      </nav>
    </div>
  );
}
