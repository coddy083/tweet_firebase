import { addTweet, uploadFile } from "firebase_init";
import { useRef, useState } from "react";

export const TweetInput = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState(null);
  const imageInputRef = useRef();

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
    <form className="mb-16 border p-3 mt-6" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <div className="flex">
          <input
            className="p-3 my-3 bg-white text-black outline-none flex-1"
            type="text"
            placeholder="트윗을 입력하세요."
            value={tweet}
            maxLength={120}
            onChange={(e) => setTweet(e.target.value)}
          />
          <input
            className="p-3 my-3 bg-slate-400 text-white"
            type="submit"
            value="트윗하기"
          />
        </div>
        <input
          ref={imageInputRef}
          className=""
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </div>
      {attachment && (
        <div className="flex flex-col">
          <img
            className="h-auto"
            src={attachment}
            width="120px"
            height="120px"
            alt="attachment"
          />
          <button
            className="p-2 my-3 bg-red-500 text-white"
            onClick={() => setAttachment(null)}
          >
            지우기
          </button>
        </div>
      )}
    </form>
  );
};
