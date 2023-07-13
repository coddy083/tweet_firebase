import React, { useEffect, useState } from "react";
import { dbService, logOut } from "firebase_init";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { EditProfileInput } from "components/EditProfileInput";

export default function Profile({ userObj, refreshUser }) {
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = useState([]);

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

  return (
    <>
      <EditProfileInput userObj={userObj} refreshUser={refreshUser} />
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
