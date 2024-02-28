"use client";

import { useAuth } from "@/contexts/auth.context";
import { useModal } from "@/contexts/modal.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogInModal from "../LogInModal";

function HeaderMenu() {
  const auth = useAuth();
  const router = useRouter();
  const modal = useModal();

  const handleClickLogOut = async () => {
    auth.logOut();
    router.replace("/");
  };

  const handleClickLogIn = () => {
    modal.open(<LogInModal />);
  };

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {auth.isLoggedIn ? (
        <>
          <button
            onClick={handleClickLogOut}
            className="mr-10 text-[17px] font-medium text-gray-800 hover:text-black transition"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleClickLogIn}
            className="mr-10 text-[17px] font-medium text-gray-800 hover:text-black transition"
          >
            로그인
          </button>
          <Link
            href="/sign-up"
            className="mr-20 text-[17px] font-medium text-gray-800 hover:text-black transition"
          >
            회원가입
          </Link>
        </>
      )}
    </div>
  );
}

export default HeaderMenu;
