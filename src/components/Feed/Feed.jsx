/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import Post from "./Post";
import TweetBox from "./TweetBox";
import { db } from "../../firebaseConfig";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);
  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(db, "posts"),orderBy("timestamp", "desc")),
  //       (queysnapshot) => {
  //         let postsArr = [];
  //         queysnapshot.forEach((doc) => {
  //           postsArr.push({ ...doc.data()});
  //         });
  //         setPosts(postsArr);
  //       }
  //     ),
  //   [db]
  // );
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  )
  return (
    <div className="sm:ml-[134px] xl:ml-[340px] w-[600px] min-h-screen border-r border-twitter-background-color py-2">
      {/* Header */}
      <div className="sticky top-0 flex justify-between font-medium text-[20px] px-4 py-2">
        <h2>Home</h2>
        <HiOutlineSparkles />
      </div>

      {/* TweetBox  */}
      <TweetBox />

      {/* Post */}
      <FlipMove>

      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
