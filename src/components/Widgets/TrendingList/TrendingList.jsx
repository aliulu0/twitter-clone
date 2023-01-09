import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";

function TrendingList({about, hashtag, tweetsCount }) {
  return (
    <div className="flex items-start justify-between bg-transparent px-4 py-3 hover:bg-twitter-background-color cursor-pointer">
      <div className="flex flex-col">
        <h4 className="text-username-color text-xs">{about} &nbsp;·&nbsp; Trending</h4>
        <h2 className="text-[15px] font-semibold ">#{hashtag}</h2>
        <p className="text-username-color text-xs">{tweetsCount} Tweets</p>
      </div>
      <MdOutlineMoreHoriz className="hover:bg-twitter-hover-background h-6 w-6 hidden xl:inline xl:ml-10  rounded-3xl cursor-pointer" />
    </div>
  );
}

export default TrendingList;
