import React, { useRef } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const signInMutation = useMutation({
    mutationFn: (user: { username: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/signin", user, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("error from server", error);
    },
  });
  const routeToSignup = () => {
    navigate("signup");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col p-10 gap-4 rounded-md bg-slate-400">
        <Input placeholder="username" reference={usernameRef} />
        <Input placeholder="password" reference={passwordRef} />
        <Button
          size="md"
          title="Log In"
          variant="Primary"
          onClick={() => {
            signInMutation.mutate({
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            });
          }}
        />
        <div className="flex items-center gap-4">
          Not a Member?
          <Button
            size="md"
            title="Signup Here"
            variant="Secondary"
            onClick={routeToSignup}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
