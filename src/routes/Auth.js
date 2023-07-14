import React, { useState } from "react";
import { socialLogin } from "firebase_init";
import { LoginInput } from "components/LoginInput";

export default function Auth() {
  const [newAccount, setNewAccount] = useState(false); // true: 회원가입, false: 로그인
  const [errorMassage, setErrorMassage] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const socialLoginClick = async (e) => {
    const { name } = e.target;
    try {
      await socialLogin(name);
    } catch (error) {
      console.log(error);
    }
  };

  const Button = ({ name }) => {
    return (
      <button
        className="self-end text-lg text-gray-500"
        onClick={toggleAccount}
      >
        {newAccount
          ? "회원이시라면 로그인..."
          : "아직 계정이 없으신가요? 회원가입"}
      </button>
    );
  };

  const SocialLoginButton = ({ name, title }) => {
    return (
      <button
        className="p-3 my-1 bg-lime-400 rounded-lg text-gray-800"
        onClick={socialLoginClick}
        name={name}
      >
        {title}
      </button>
    );
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center my-0 mx-auto w-96">
        <LoginInput newAccount={newAccount} setErrorMassage={setErrorMassage} />
        <Button />
        <div>{errorMassage}</div>
        <div className="flex flex-col mt-6 w-full">
          <SocialLoginButton name="google" title="구글 로그인" />
          <SocialLoginButton name="github" title="GITHUB 로그인" />
        </div>
      </div>
    </div>
  );
}
