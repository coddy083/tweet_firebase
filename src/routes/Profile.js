import React, { useEffect, useState } from "react";
import { authService, dbService, logOut } from "firebase_init";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function Profile({ userObj, refreshUser }) {
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const myTweets = [];
    querySnapshot.forEach((doc) => {
      myTweets.push({ id: doc.id, ...doc.data() });
    });
    setMyTweets(myTweets);
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const logOutClick = () => {
    logOut();
    navigate("/");
  };

  const displayNameChange = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // update profile
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={displayNameChange}>
        <input type="file" accept="image/*" />
        <input
          type="text"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          placeholder="이름"
        />
        <input type="submit" value="프로필 업데이트" />
      </form>
      <button onClick={logOutClick}>로그아웃</button>
      <div>
        {myTweets.map((tweet) => (
          <div key={tweet.id}>
            {tweet.attachmentUrl && (
              <img
                src={tweet.attachmentUrl}
                width="100px"
                height="100px"
                alt={tweet.tweet}
              />
            )}
            <p>{tweet.tweet}</p>
          </div>
        ))}
      </div>
    </>
  );
}
