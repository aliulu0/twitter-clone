import React from "react";
import "./SignIn.css";
import {BsTwitter} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc'
import { useAuth } from "../../context/UserContext";
import { toast } from "react-toastify";

function SignIn() {
  const { googleSignIn } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn();
      console.log("user is signed in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="account-background">
      <div className="account-container">
        <div className="account-content">
          <div className="twitter-icon">
            <BsTwitter />
          </div>
          <h2>Sign in to Twitter</h2>

          <button
            className="google-btn"
            type="submit"
            onClick={handleSignInWithGoogle}
          >
            <FcGoogle className="text-4xl xl:ml-2 xl:mr-10 sm:ml-0 sm:mr-10" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
