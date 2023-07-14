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
    <>
      {!editing && (
        <>
          <div className="flex flex-col border-b-2 py-1 my-3">
            {isOwner && !editing && (
              <div className="flex justify-end my-1">
                <button
                  className="w-fit bg-black text-white mr-1 p-1"
                  onClick={onDeleteClick}
                >
                  삭제
                </button>
                <button
                  className="w-fit bg-black text-white mr-1 p-1"
                  onClick={onEditClick}
                >
                  수정
                </button>
              </div>
            )}
            {tweetObj.attachmentUrl && (
              <img
                className="h-auto"
                src={tweetObj.attachmentUrl}
                alt={tweetObj.tweet}
              />
            )}
            <p className="mt-2 text-lg">{tweetObj.tweet}</p>
          </div>
        </>
      )}
      {editing && (
        <div>
          <form onSubmit={onSubmit} className="flex">
            <input
              className="p-2 my-1 mr-2 bg-white text-black border flex-1"
              type="text"
              placeholder="수정할 내용을 입력하세요."
              value={newTweet}
              required
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <input
              className="mx-1 bg-black text-white p-1"
              type="submit"
              value="완료"
            />
            <button
              className="mx-1 bg-black text-white p-1"
              onClick={onEditClick}
            >
              취소
            </button>
          </form>
        </div>
      )}
    </>
  );
}
