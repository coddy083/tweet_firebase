import React, { useState } from "react";
import { signIN, signUp, socialLogin } from "firebase_init";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [newAccount, setNewAccount] = useState(true); // true: 회원가입, false: 로그인

  const onSubmit = async (e) => {
    e.preventDefault(); // submit 이벤트 발생 시 새로고침 방지
    if (newAccount) {
      // 회원가입
      try {
        await signUp(email, password);
      } catch (error) {
        console.log(error);
        setErrorMassage("이메일이 이미 존재하거나 비밀번호가 너무 짧습니다.");
      }
    } else {
      // 로그인
      try {
        await signIN(email, password);
      } catch (error) {
        setErrorMassage("이메일이 존재하지 않거나 비밀번호가 틀립니다.");
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const socialLoginClick = async (e) => {
    const { name } = e.target;
    console.log(name);
    try {
      await socialLogin(name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
      <div>{errorMassage}</div>
      <div>
        <button onClick={socialLoginClick} name="google">
          Continue with Google
        </button>
        <button onClick={socialLoginClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}
