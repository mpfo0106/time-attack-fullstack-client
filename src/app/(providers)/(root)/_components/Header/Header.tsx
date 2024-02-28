import Link from "next/link";
import HeaderMenu from "./components/HeaderComponents";
import HeaderNav from "./components/HeaderComponents/HeaderNav";

function Header() {
  return (
    <header className="bg-white sticky top-0 h-16 border-b flex items-center px-5 lg:px-8 z-10 shrink-0">
      <Link href="/" className="ml-20 font-bold text-2xl">
        중고마켓
      </Link>
      <HeaderNav />
      <HeaderMenu />
    </header>
  );
}

export default Header;
