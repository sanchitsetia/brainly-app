import React, { ReactElement } from "react";

const SideBarItem = ({ icon, text }: { icon: ReactElement; text: string }) => {
  return (
    <div className="flex w-full gap-4 p-2 items-center hover:bg-slate-200 transition-all duration-200">
      <div>{icon}</div>
      <div className="text-2xl text-gray-500">{text}</div>
    </div>
  );
};

export default SideBarItem;
