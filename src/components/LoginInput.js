import { signIN, signUp } from "firebase_init";
import { useState } from "react";
import { UserInput } from "./UserInput";

export const LoginInput = ({ setErrorMassage, newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <UserInput
        type="email"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      <UserInput
        type="password"
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <input
        className="bg-slate-400 text-white p-3 my-3"
        type="submit"
        value={newAccount ? "회원가입" : "로그인"}
      />
    </form>
  );
};
