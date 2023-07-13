import React, { useEffect, useState } from "react";
import { dbService } from "../firebase_init";
import {
  collection,
  query,
  orderBy,
  // limit,
  onSnapshot,
} from "firebase/firestore";
import Tweet from "components/Tweet";
import { TweetInput } from "components/TweetInput";

export default function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(dbService, "tweets"),
        orderBy("createdAt", "desc")
        // limit(20)
      ),
      (snapshot) => {
        const tweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetsArray);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <TweetInput userObj={userObj} />
      <div className="grid grid-cols-1">
        {tweets &&
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
}
