import React from "react";
import Button from "./ui/Button";
import CloseIcon from "../Icons/CloseIcon";
import Input from "./ui/Input";

interface addContentModalProp {
  open: boolean;
  onClose: () => void;
}

const AddContentModal = (props: addContentModalProp) => {
  return (
    <div>
      {props.open && (
        <div className="bg-slate-400 bg-opacity-50 fixed flex justify-center w-screen h-screen items-center">
          <div className="p-6 bg-white rounded-md flex flex-col w-80 gap-4">
            <div
              className="flex justify-end cursor-pointer z-10"
              onClick={props.onClose}
            >
              <CloseIcon />
            </div>
            <Input placeholder="Enter title" />
            <Input placeholder="Enter URL" />
            <div className="flex justify-center">
              <Button size="sm" title="Submit" variant="Primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentModal;
