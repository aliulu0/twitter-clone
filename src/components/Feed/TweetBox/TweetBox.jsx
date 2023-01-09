import React, { useState } from "react";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";

import { useAuth } from "../../../context/UserContext";

function TweetBox() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser?.id,
      name: currentUser?.name,
      avatar: currentUser?.avatar,
      username: currentUser?.username,
      text,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }else if(text.includes([".png",".jpeg",".jpg",".gif"])) {
      await uploadString(imageRef, text, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setText("");
    setLoading(false);
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  return (
    <div className={`mt-4 px-4 ${loading && "opacity-60"}`} >
      <div className="flex grid-cols-[48px, 1fr] gap-4">
        <div>
          <img
            src={currentUser?.avatar}
            alt="profile"
            className="h-12 w-12 rounded-full object-contain"
          />
        </div>
        <div className="w-[90%]" onClick={() => setShowEmojis(false)}>
          <textarea
            className="tweet-area w-[100%] bg-transparent outline-none text-[20px] resize-y  "
            rows="2"
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {selectedFile && (
            <div className="relative mb-4">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose className="text-white h-5" />
              </div>

              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
          {!loading && (
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-[20px] text-twitter-color ">
                <div className="p-2 rounded-full hover:bg-twitter-hover-background">
                  <label htmlFor="file">
                    <BsImage className="cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div className="p-1 text-[25px] rounded-full hover:bg-twitter-hover-background">
                  <label htmlFor="file">
                    <HiOutlineGif className="cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".gif"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div className="p-1">
                  <RiBarChart2Line className="rotate-90" />
                </div>
                <div className="w-[30px] h-[30px] p-1 rounded-full hover:bg-twitter-hover-background">
                  <BsEmojiSmile
                    className="cursor-pointer"
                    onClick={() => setShowEmojis(!showEmojis)}
                  />
                </div>
                <div className="p-1">
                  <IoCalendarNumberOutline />
                </div>
                <div className="p-1">
                  <HiOutlineLocationMarker />
                </div>
              </div>
              <button
                className="text-white bg-twitter-color rounded-full px-4 py-1.5 font-bold shadow-md disabled:hover:bg:[#1a8cd8] disabled:opacity-50 disabled:cursor-default hover:bg-[#1a8cd8]"
                disabled={!text.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}
          {showEmojis && (
            <div className="z-20 absolute mt-10px -ml-40px max-w-[320px] rounded-[20px]">
              <Picker onEmojiSelect={addEmoji} data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
