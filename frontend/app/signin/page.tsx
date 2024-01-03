"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:4000/auth/signin", {
        email: email,
        password: password,
      });
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-5">
      <h2 className="text-center text-xl font-bold my-10">
        Welcome to the Task Manager!
      </h2>
      <form className="flex flex-col gap-4 rounded-md border px-5 py-10">
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            onChange={(e) => setEmail((prev) => e.target.value)}
            value={email}
            id="email"
            type="email"
            placeholder="jhonwick@gmail.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            onChange={(e) => setPassword((prev) => e.target.value)}
            value={password}
            id="password"
            type="password"
            placeholder="password"
            autoComplete="current-password"
          />
        </div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link className=" underline text-sm font-medium" href="/signup">
            Sign up here
          </Link>
        </p>
        <Button onClick={handleSubmit}>Login</Button>
      </form>
    </div>
  );
};

export default SignInPage;
