import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsBarChart, BsChatDots } from "react-icons/bs";
import Moment from "react-moment";

function Comment({ comment }) {
  
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-username-color">
            <div className="flex items-center justify-start gap-2 ">
              <h4 className="font-bold text-black text-[20px] sm:text-base hover:underline">
                {comment?.author}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.username}
              </span>
              ·
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-black mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <BiDotsHorizontalRounded className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <BsChatDots
              className="h-5 group-hover:text-[#1d9bf0]"
            />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10 rounded-3xl">
              <AiOutlineHeart className="h-5 group-hover:text-pink-600 " />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <AiOutlineShareAlt className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <BsBarChart className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
