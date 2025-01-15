import React from "react";
import BrainIcon from "../../Icons/BrainIcon";
import SideBarItem from "./SideBarItem";
import YoutubeIcon from "../../Icons/YoutubeIcon";

const SideBar = () => {
  return (
    <div className="h-screen w-full border-r-slate-200 border-r-2 p-4">
      <div className="flex items-center gap-2">
        <div className="text-purple-600">
          <BrainIcon />
        </div>
        <p className="text-3xl">Second Brain</p>
      </div>
      <div className="flex flex-col mt-10 gap-4">
        <SideBarItem icon={<YoutubeIcon />} text="Tweets" />
        <SideBarItem icon={<YoutubeIcon />} text="Videos" />
      </div>
    </div>
  );
};

export default SideBar;
