import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import Post from "../Post";
import Comment from "./Comment";

function SinglePost() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(
      () =>
          onSnapshot(
              query(
                  collection(db, `posts/${id}/comments`),
                  orderBy("timestamp", "desc")
              ),
              (snapshot) => setComments(snapshot.docs)
          ),
      [id]
  )

  useEffect(
    () =>
        onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
        }),
    [id]
)
  return (
    <section className="sm:ml-[135px] xl:ml-[340px] w-[600px] min-h-screen  py-2">
      <div className="sticky top-0 flex items-center gap-4 font-medium text-[20px] px-4 py-2">
        <BsArrowLeft
          className="cursor-pointer"
          onClick={() => navigate(`/home`)}
        />
        Twitter
      </div>

      <Post id={id} post={post} />

      <div className="border-t border-gray-700">
        {comments.length > 0 &&
          
            <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment.data()}
                                post={post}
                            />
                        ))}
                    </div> 
          }
      </div>
    </section>
  );
}

export default SinglePost;
