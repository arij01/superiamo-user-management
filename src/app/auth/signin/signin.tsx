'use client';

import { handleEmailSignIn } from "@/src/lib/auth/emailSignInServerAction";
import { handleGoogleSignIn } from "@/src/lib/auth/googleSignInServerAction";
import { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc"

export const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" as string });
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (error) {
      console.error(error);
    }
  };
    return (
    <div className="signin-page">
        <div className="signin-card">
        <h2>Sign In</h2>
            <div className="form-container">
            <form className="email-signin-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="email"
              maxLength={320}
              placeholder="Email Address"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ email: event.target.value })
              }
              disabled={isPending}
              required
            />
            <button className="submit-button" type="submit">
              Sign in with email
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>
              <div className="social-logins">
              <button className="google" onClick={()=>handleGoogleSignIn()}>
                <FcGoogle className="google-icon"/>
                Sign in with Google
              </button>
              </div>  
            </div>
        </div>
    </div>
    
    );
}