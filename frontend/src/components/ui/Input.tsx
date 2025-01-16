import React from "react";

const Input = ({
  placeholder,
  reference,
}: {
  placeholder: string;
  reference?: any;
}) => {
  return (
    <div>
      <input
        className="w-full rounded-md h-12 p-4 border-2 border-slate-200"
        placeholder={placeholder}
        ref={reference}
      ></input>
    </div>
  );
};

export default Input;
