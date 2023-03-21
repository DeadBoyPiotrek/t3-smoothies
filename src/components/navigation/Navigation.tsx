import Link from "next/link";

function Navigation() {
  return (
    <div className="absolute w-full">
      <nav className="flex items-center justify-center gap-3  py-4 px-8 text-white">
        <Link href="/">
          <button className="btn">Home</button>
        </Link>
        <Link href="/create">
          <button className="btn">Create</button>
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;
