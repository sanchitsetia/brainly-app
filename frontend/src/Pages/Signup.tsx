import React, { useRef } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const signupMutation = useMutation({
    mutationFn: (user: { username: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/signup", user);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("error from server", error);
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col p-10 gap-4 rounded-md bg-slate-400">
        <Input placeholder="username" reference={usernameRef} />
        <Input placeholder="password" reference={passwordRef} />
        <Button
          size="md"
          title="Sign Up"
          variant="Primary"
          onClick={() => {
            signupMutation.mutate({
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
