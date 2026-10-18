import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/components/Authentication/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {  toast } from 'sonner'


export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginEmail = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        navigate("/", { replace: true });
      }
    } catch (err) {

      toast.error(err.message);
    }
  };

  const handleSignUpEmail = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        toast.success("sucessfully sign up ");

      }
    } catch (err) {
      toast.error(err.message);

    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
      <>
      <form className={cn("flex flex-col gap-6 ", className)} {...props}>
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Medisense.Ai</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Use the form below to log in or create an account.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email" >Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Action Buttons for Login and Sign Up */}
          <div className="flex gap-4">
            <Button onClick={handleLoginEmail} type="button" className="w-full">
              Login
            </Button>
            <Button onClick={handleSignUpEmail} type="button" className="w-full">
              Sign Up
            </Button>
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
          </div>

          {/* Google Sign-In Button */}
          <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
              <path
                  d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"
              ></path>
            </svg>
            Login with Google
          </Button>
        </div>
      </form>
  </>
  );
}
