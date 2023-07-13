import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "firebase_init";
import React, { useState } from "react";

export default function Tweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.tweet);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      // delete tweet
      // from url delete
      await deleteDoc(doc(dbService, "tweets", tweetObj.id));

      // from storage delete
      if (tweetObj.attachmentUrl)
        await deleteObject(ref(storageService, tweetObj.attachmentUrl));
    }
  };

  const onEditClick = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, "tweets", tweetObj.id), {
      tweet: newTweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {!editing && (
        <>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              width="100px"
              height="100px"
              alt={tweetObj.tweet}
            />
          )}
          <p>{tweetObj.tweet}</p>
        </>
      )}
      {editing && (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정할 내용을 입력하세요."
              value={newTweet}
              required
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <input type="submit" value="완료" />
            <button onClick={onEditClick}>취소</button>
          </form>
        </>
      )}
      {isOwner && !editing && (
        <>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={onEditClick}>수정</button>
        </>
      )}
    </div>
  );
}
