import React from "react";
import {BsTwitter} from 'react-icons/bs'
import {BiHomeCircle} from 'react-icons/bi'
import {CiHashtag} from 'react-icons/ci'
import {GrNotification} from 'react-icons/gr'
import {FiMail} from 'react-icons/fi'
import {GiFeather} from 'react-icons/gi'
import {HiOutlineBookmark} from 'react-icons/hi'
import {MdOutlineArticle, MdOutlineMoreHoriz} from 'react-icons/md'
import {BsPerson} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'

import SidebarOption from "./SidebarOption";
import { useAuth } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { currentUser, logOut } = useAuth();
  const {avatar, name, username} = currentUser;
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("You are now logged out");
    } catch (err) {
      console.log(err);
    }
  };
  const goHomePage = () => {
    navigate("/home")
  }

  const onFocusTweetArea = () => {
    const tweetArea = document.querySelector(".tweet-area");
    tweetArea?.focus();

  }

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] sm:w-[134px] sm:items-end sm:px-4 p-2 fixed h-full border-r border-twitter-background-color xl:pr-8 ">
      {/* Twitter icon */}
      <div className="flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hover:hover-effect-twitter">
        <BsTwitter
          className="text-twitter-color text-[34px]"
          onClick={goHomePage}
        />
      </div>

      {/* Sidebar options */}
      <div className="space-y-2 mt-4 mb-2.5 xl:ml-24">
        <SidebarOption text="Home" Icon={BiHomeCircle} />
        <SidebarOption text="Explore" Icon={CiHashtag} />
        <SidebarOption text="Notifications" Icon={GrNotification} />
        <SidebarOption text="Messages" Icon={FiMail} />
        <SidebarOption text="Bookmarks" Icon={HiOutlineBookmark} />
        <SidebarOption text="Lists" Icon={MdOutlineArticle} />
        <SidebarOption text="Profile" Icon={BsPerson} />
        <SidebarOption text="More" Icon={CgMoreO} />
      </div>

      {/* Button -> Tweet */}
      <button className="hidden xl:inline ml-auto text-white bg-twitter-color rounded-full w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]" onClick={onFocusTweetArea}>
        Tweet
      </button>
      <button className="hidden items-center xl:invisible mx-auto sm:mr-1 text-white bg-twitter-color rounded-full hover:bg-[#1a8cd8] sm:inline sm:w-14 sm:h-14 sm:visible" onClick={onFocusTweetArea}>
        <GiFeather className="text-4xl ml-[10px]" />
      </button>
      <div
                className="flex items-center xl:w-60 justify-evenly mt-auto hover:hover-effect xl:ml-14 sm:w-16 sm:ml-1 p-2"
                onClick={handleLogOut}
            >
                <img
                    src={avatar}
                    alt=""
                    className="xl:h-14 xl:w-14 rounded-full xl:mr-2.5 sm:w-12 sm:h-12"
                /> 
                 <div className="hidden xl:inline xl:leading-5">
                    <h4 className="font-bold">{name}</h4>
                    <p className="text-username-color">@{username}</p>
                </div>
                <MdOutlineMoreHoriz className="xl:h-5 hidden xl:inline xl:ml-10" />
            </div>
    </div>
  );
}

export default Sidebar;
