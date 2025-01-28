import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto border-b border-gray-200">
      <Link href={"/"} className="text-2xl font-semibold tracking-wide text-gray-800 hover:text-gray-900">
        Shahil Sharma
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link href={"/blog"} className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Blog
          </Link>
        </li>
        <li>
          <Link href={"/video"} className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Video
          </Link>
        </li>
        <li>
          <Link href={"/shop"} className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Shop
          </Link>
        </li>
      </ul>
      <button className="transform hover:scale-90 px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300">
        Account
      </button>
    </nav>
  );
}
