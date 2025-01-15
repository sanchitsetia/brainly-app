import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col p-10 gap-4 bg-white rounded-md bg-slate-200">
        <Input placeholder="username" />
        <Input placeholder="password" />
        <Button size="md" title="Log In" variant="Primary" />
      </div>
    </div>
  );
};

export default Signin;
