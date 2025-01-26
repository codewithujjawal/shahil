import Image from "next/image";
export default function Navbar() {

  return (
    <nav className="flex justify-around items-center flex-row mt-2 mb-2">
        <a href="/"><h1 className="text-[1.3rem] font-playwrite">Shahil Sharma</h1></a>
        <ul className="flex">
            <a href="/blog" className="mr-4 text-[1.1rem]">Blog</a>
            <a href="/video"><li className="mr-4 text-[1.1rem]">Video</li></a>
            <a href="/shop"><li className="mr-4 text-[1.1rem]">Shop</li></a>
            <a href="/contact"><li className="text-[1.1rem]">Contact</li></a>
        </ul>
        <button>Account</button>
    </nav>
  );
}