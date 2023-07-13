import React, { useEffect, useState } from "react";
import { addTweet, dbService, uploadFile } from "../firebase_init";
import {
  collection,
  query,
  orderBy,
  // limit,
  onSnapshot,
} from "firebase/firestore";
import Tweet from "components/Tweet";

export default function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

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

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    //Create the file reader
    const reader = new FileReader();
    //Read the file
    reader.readAsDataURL(files[0]);
    //When the file is loaded
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweet === "") {
      alert("내용을 입력하세요.");
      return;
    }
    //bucket에 파일을 저장하고 url을 받아온다.
    if (attachment === null) {
      await addTweet(tweet, userObj, "");
      setTweet("");
      return;
    }
    const attachmentUrl = await uploadFile(attachment, userObj);
    await addTweet(tweet, userObj, attachmentUrl);
    setTweet("");
    setAttachment(null);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={tweet}
          maxLength={120}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
      </form>
      {attachment && (
        <div>
          <img src={attachment} width="120px" height="120px" alt="attachment" />
          <button onClick={() => setAttachment(null)}>지우기</button>
        </div>
      )}
      <div>
        {tweets &&
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </>
  );
}
