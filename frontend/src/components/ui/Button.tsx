import React, { ReactElement } from "react";

interface buttonProps {
  title: string;
  variant: "Primary" | "Secondary";
  startIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

const variantClass = {
  Primary: "bg-purple-600 text-white",
  Secondary: "bg-purple-200 text-purple-400",
};

const sizeVariant = {
  sm: "px-4 py-2 gap-2",
  md: "px-6 py-4 gap-4",
  lg: "px-8 py-6 gap-6",
};

const defaultStyles = "rounded-lg flex justify-center";

const Button = (props: buttonProps) => {
  return (
    <button
      className={`${variantClass[props.variant]} ${
        sizeVariant[props.size]
      } ${defaultStyles}`}
      onClick={props.onClick}
    >
      <div>{props.startIcon}</div>
      <div>{props.title}</div>
    </button>
  );
};

export default Button;
