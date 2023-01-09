import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { HiOutlineGif } from "react-icons/hi2";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import Moment from "react-moment";
import { useApp } from "../../../../context/AppContext";
import { useAuth } from "../../../../context/UserContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Modal() {
  const { appContext, setAppContext } = useApp();
  const [modalText, setModalText] = useState("");
  const [selectedModalFile, setSelectedModalFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const post = appContext.post;
  const navigate = useNavigate();

  const closeModal = () => {
    setAppContext({ ...appContext, isModalOpen: false });
  };
  const sendComment = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(
      collection(db, `posts/${appContext.postId}/comments`),
      {
        comment: modalText,
        author: currentUser.name,
        username: currentUser.username,
        userImg: currentUser.avatar,
        timestamp: serverTimestamp(),
      }
    );
    const imageRef = ref(storage, `posts/${docRef.id}/comments/image`);
    if (selectedModalFile) {
      await uploadString(imageRef, selectedModalFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(
          doc(db, `posts/${appContext.postId}/comments`, docRef.id),
          {
            image: downloadURL,
          }
        );
      });
    }
    setAppContext({ ...appContext, isModalOpen: false });
    setModalText("");
    setSelectedModalFile(true);
    setLoading(false);
    navigate(`/{posts/${appContext.postId}}`);
  };

  const addImageToModal = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = (readerEvent) => {
      setSelectedModalFile(readerEvent.target.result);
    };
  };
  const addEmojiModal = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setModalText(modalText + emoji);
  };
  return (
    <div
      className="fixed to-0 left-0 z-[20] h-screen w-screen bg-[#242d34bb]"
      onClick={()=> {
        closeModal()
        setShowEmojis(false)
        }}
    >
      <div
        className="bg-white w-[350px] md:w-[650px] text-black absolute left-[50%] translate-x-[-50%] mt-[40px] p-4 rounded-[20px]"
        onClick={
          (e) => {
            e.stopPropagation()
            setShowEmojis(false)
            }}
      >
        <MdClose className="text-[22px] cursor-pointer" onClick={closeModal} />

        <div className="relative mt-8 grid grid-cols-[48px,1fr] gap-4">
          <div>
            <img className="rounded-full" src={post?.avatar} alt="" />
          </div>

          <div>
            <div className="flex gap-2 text-[12px] md:text-[16px]">
              <h1>{post?.name}</h1>
              <h2 className="text-username-color">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </h2>
            </div>
            <p className="text-[12px] md:text-[16px]">{post?.text}</p>

            <img
              src={post?.image}
              className="mt-2 max-h-[250px] rounded-[15px] object-cover"
              alt=""
            />

            <p className="mt-4 text-username-color">
              Replying to:{" "}
              <span className="text-twitter-color">@{post?.username}</span>
            </p>
          </div>

          <div className="mt-4">
            <img className="rounded-full" src={currentUser.avatar} alt="" />
          </div>
          <div className="mt-4">
            <textarea
              className="w-[100%] bg-transparent outline-none text-[18px]"
              rows="4"
              placeholder="Tweet your reply"
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
            />
            {selectedModalFile && (
            <div className="relative mb-4">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedModalFile(null)}
              >
                <AiOutlineClose className="text-white h-5" />
              </div>

              <img
                src={selectedModalFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}

            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-[20px] text-twitter-color">
                
                <div className="p-2 rounded-full hover:bg-twitter-hover-background">
                  <label htmlFor="fileModal">
                    <BsImage className="cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="fileModal"
                    accept="image/*"
                    hidden
                    onChange={addImageToModal}
                  />
                </div>
                <div className="p-1 text-[25px] rounded-full hover:bg-twitter-hover-background">
                  <label htmlFor="fileModal">
                    <HiOutlineGif className="cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="fileModal"
                    accept=".gif"
                    hidden
                    onChange={addImageToModal}
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

              {!loading && (
                <button
                  className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                  disabled={!modalText.trim()}
                  onClick={sendComment}
                >
                  Tweet
                </button>
              )}
              {showEmojis && (
                <div className="absolute max-w-[320px] max-h-[500px] top-0 right-5 bottom-5 rounded-[20px]">
                  <Picker onEmojiSelect={addEmojiModal} data={data} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
