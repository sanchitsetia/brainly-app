import React, { useRef } from "react";
import Button from "./ui/Button";
import CloseIcon from "../Icons/CloseIcon";
import Input from "./ui/Input";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface addContentModalProp {
  open: boolean;
  onClose: () => void;
}

const AddContentModal = (props: addContentModalProp) => {
  const titleRef = useRef();
  const linkRef = useRef();
  const queryClient = useQueryClient();
  const contentMutation = useMutation({
    mutationFn: async (content: {
      title: string;
      link: string;
      type: string;
    }) => {
      return await axios.post(
        "http://localhost:3000/api/v1/content",
        {
          title: content.title,
          link: content.link,
          type: content.type,
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      props.onClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
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
            <Input placeholder="Enter title" reference={titleRef} />
            <Input placeholder="Enter URL" reference={linkRef} />
            <div className="flex justify-center">
              <Button
                size="sm"
                title="Submit"
                variant="Primary"
                onClick={() => {
                  contentMutation.mutate({
                    title: titleRef.current?.value,
                    link: linkRef.current?.value,
                    type: "youtube",
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentModal;
