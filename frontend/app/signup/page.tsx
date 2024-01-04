"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { validateEmail, validateName, validatePassword } from "@/lib/utils";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string | null>>({
    name: null,
    email: null,
    password: null,
    confirm: null,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prev) => e.target.value);
    const error = validateName(e.target.value);
    if (error) {
      setErrors((prev) => {
        return { ...prev, name: error };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, name: null };
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => e.target.value);
    const error = validateEmail(e.target.value);
    if (error) {
      setErrors((prev) => {
        return { ...prev, email: error };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, email: null };
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => e.target.value);
    const error = validatePassword(e.target.value);
    if (error) {
      setErrors((prev) => {
        return { ...prev, password: error };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, password: null };
      });
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm((prev) => e.target.value);
    const error = password !== e.target.value;
    if (error) {
      setErrors((prev) => {
        return { ...prev, confirm: "Password did not match" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, confirm: null };
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (password !== confirm) throw new Error("passwords do not match");
      const res = await axios.post("http://127.0.0.1:4000/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      alert("successfully created account please sign in.");
      router.push("/signin");
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
          <Label htmlFor="name">Name:</Label>
          <Input
            onChange={handleNameChange}
            value={name}
            id="name"
            type="text"
            placeholder="Jhon Wick"
          />
          <p className="text-red-500">
            {errors.name !== null && <span>{errors.name}</span>}
          </p>
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            onChange={handleEmailChange}
            value={email}
            id="email"
            type="email"
            placeholder="jhonwick@gmail.com"
          />
          <p className="text-red-500">
            {errors.email !== null && <span>{errors.email}</span>}
          </p>
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            onChange={handlePasswordChange}
            value={password}
            id="password"
            type="password"
            placeholder="password"
            autoComplete="current-password"
          />
          <p className="text-red-500">
            {errors.password !== null && <span>{errors.password}</span>}
          </p>
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm Password:</Label>
          <Input
            onChange={handleConfirmChange}
            value={confirm}
            id="confirm-password"
            type="password"
            placeholder="confirm password"
            autoComplete="password"
          />
          <p className="text-red-500">
            {errors.confirm !== null && <span>{errors.confirm}</span>}
          </p>
        </div>
        <p className="text-sm">
          Already have an account?{" "}
          <Link className=" underline text-sm font-medium" href="/signin">
            Sign in here
          </Link>
        </p>
        <Button
          disabled={
            errors.name !== null ||
            errors.email !== null ||
            errors.password !== null ||
            errors.confirm !== null ||
            name === "" ||
            email === "" ||
            password === "" ||
            confirm === "" 

          }
          onClick={handleSubmit}
        >
          Get Started!
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
