import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebase_init";
import Footer from "./Footer";
import { updateProfile } from "firebase/auth";

export default function App() {
  const [init, setInit] = useState(false); // firebase가 초기화 되었는지 아닌지
  const [userObj, setUserObj] = useState(null); // 로그인한 사용자의 정보를 담을 객체

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged: 사용자의 로그인 상태가 변경될 때마다 호출되는 메서드
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // 사용자의 프로필 업데이트
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      <Footer />
    </>
  );
}
