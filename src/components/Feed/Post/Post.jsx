import React, { forwardRef, useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { BsChat, BsUpload } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useAuth } from "../../../context/UserContext";
import { useApp } from "../../../context/AppContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig.js";

const Post = forwardRef(({ id, post },ref) =>  {
  const { currentUser } = useAuth();
  const { appContext, setAppContext } = useApp();

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const { name, avatar, text, image, username, timestamp } = post;
  const navigate = useNavigate();

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, `posts/${id}/likes`, currentUser.id));
      setLiked(false);
    } else {
      await setDoc(doc(db, `posts/${id}/likes`, currentUser.id), {
        username: currentUser.name,
      });
      setLiked(true);
    }
  };
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, `posts/${id}/comments`),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
        setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, `posts/${id}/likes`), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setLiked(likes.findIndex((like) => like.id === currentUser?.id) !== -1),
    [likes, currentUser]
  );

  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post,
      postId: id,
    });
  };

  // console.log(id);
  return (
    <div
      className="mt-4 border-t border-twitter-background-color px-4 pt-6 pb-4 cursor-pointer"
      onClick={() => navigate(`/posts/${id}`)}
      ref={ref}
    >
      <div className="grid grid-cols-[48px,1fr] gap-4">
        <div>
          <img
            src={avatar}
            alt="profile"
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="block sm:flex gap-1">
            <h2 className="font-medium">{name}</h2>
            <div className="flex">
              <p className="text-username-color">@{username} &nbsp;·&nbsp;</p>
              <p className="text-username-color">
                <Moment fromNow>{timestamp?.toDate()}</Moment>
              </p>
            </div>
          </div>
          <p>{text?.includes("https" || "http") ? <a className="text-twitter-color hover:underline" href={text}>{text}</a>: text}</p>
          {image && (
            <img
              className="max-h-[450px] object-cover rounded-[20px] mt-2"
              src={image}
              alt="postImg"
            />
          )}
          <div className="flex justify-between text-[20px] mt-4 w-[80%]">
            <div className="flex gap-1 items-center">
              <BsChat
                className="hover:bg-twitter-hover-background w-7 h-7 p-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              />
              {comments.length > 0 && (
                <span className="text-sm">{comments.length}</span>
              )}
            </div>
            {currentUser.id !== post.id ? (
              <FaRetweet className="hover:bg-green-300 w-7 h-7 p-1 m-2 rounded-full" />
            ) : (
              <RiDeleteBin5Line
                className="hover:bg-green-300 w-7 h-7 p-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "posts", id))
                  navigate("/home");
                }}
              />
            )}
            <div
              className="flex gap-1 items-center hover:bg-red-100 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            >
              {liked ? (
                <AiFillHeart className="w-7 h-7 p-1 text-red-500" />
              ) : (
                <AiOutlineHeart className="w-7 h-7 p-1 hover:text-red-500" />
              )}
              {likes.length > 0 && (
                <span className={`${liked && "text-red-400"} text-sm`}>
                  {likes.length}
                </span>
              )}
            </div>
            <div className="hover:bg-twitter-hover-background rounded-3xl">
              <BsUpload className="w-7 h-7 p-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Post;
