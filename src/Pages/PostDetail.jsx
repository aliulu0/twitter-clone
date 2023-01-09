import React from 'react'
import SinglePost from '../components/Feed/SinglePost'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { useApp } from "../context/AppContext";
import Modal from "../components/Feed/Post/Modal";

function PostDetail() {
  const { appContext } = useApp();

  return (
    <div>
        <main className='flex relative h-screen max-w-[1400px] mx-auto px-3'>
            <Sidebar/>
            <div className=" flex gap-6 py-2">
            <SinglePost />
            <Widgets/>
            {appContext.isModalOpen && <Modal />}
            </div>
        </main>
    </div>
  )
}

export default PostDetail