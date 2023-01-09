import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { useApp } from "../context/AppContext";
import Modal from "../components/Feed/Post/Modal";

function Home() {
  const { appContext } = useApp();

  return (
    <div className="flex relative h-screen max-w-[1400px] mx-auto px-3">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <div className="flex gap-6">
        <Feed />
      {/* widgets */}
      <Widgets />
        {appContext.isModalOpen && <Modal />}
      </div>
    </div>
  );
}

export default Home;
