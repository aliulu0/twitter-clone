import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex relative h-screen max-w-[1400px] mx-auto px-3">
      {/* Sidebar */}
      <Sidebar />
      <div className="block sm:ml-[100px]  xl:-ml-[250px] w-screen py-2">
        <div className="flex flex-col items-center xl:ml-[710px] mt-[100px] sm:ml-auto">
          <p className="text-[14px]">
            Hmm...this page doesn’t exist. Try searching for something else.
          </p>
          <button
            className="text-white bg-twitter-color rounded-full px-4 py-1.5 font-bold shadow-md disabled:hover:bg:[#1a8cd8] disabled:opacity-50 disabled:cursor-default hover:bg-[#1a8cd8] mt-8"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
