"use client";

import { useRouter } from "next/navigation";

export const SignInButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={props.className}
      style={{ cursor: "pointer" }}
      onClick={() => {
        router.push("/auth/signin");
      }}
    >
      {props.children || "Se connecter"}
    </button>
  );
};