"use client";

import API from "@/api";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/auth.context";
import { useModal } from "@/contexts/modal.context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogInModal() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: API.auth.logIn,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();
  const modal = useModal();

  const handleClickLogIn = async () => {
    if (!email.trim()) return alert("이메일을 입력해 주세요");
    if (!password.trim()) return alert("비밀번호를 입력해 주세요");
    if (password.length < 8)
      return alert("비밀번호는 8글자 이상으로 해야합니다.");

    try {
      const accessToken = await mutateAsync({ email, password });

      if (!accessToken) return alert("토큰 실패");
      auth.logIn(accessToken);

      router.replace("/");
      modal.close();
    } catch (e) {
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <Modal>
      <Heading>로그인하기</Heading>

      <section className="flex flex-col items-center gap-y-4 max-w-sm mx-auto w-full">
        <Input
          label="이메일"
          autoFocus
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />

        <div className="mt-2" />

        <Button color="black" onClick={handleClickLogIn}>
          로그인하기
        </Button>
      </section>
    </Modal>
  );
}

export default LogInModal;
