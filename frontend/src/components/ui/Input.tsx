import React from "react";

const Input = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: () => void;
}) => {
  return (
    <div>
      <input
        className="w-full rounded-md h-12 p-4 border-2 border-slate-200"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
