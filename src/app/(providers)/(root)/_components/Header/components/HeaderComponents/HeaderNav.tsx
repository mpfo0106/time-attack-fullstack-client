import Link from "next/link";

function HeaderNav() {
  return (
    <nav className="ml-40">
      <Link href="/" className="mr-10 gap-20 text-[17px] font-medium">
        구입하기
      </Link>
      <Link href="/deals/create" className="mr-10 text-[17px] font-medium">
        판매하기
      </Link>
      <Link href="/my/deals" className="mr-10 text-[17px] font-medium">
        내 판매글
      </Link>
    </nav>
  );
}

export default HeaderNav;
