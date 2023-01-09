import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [currentUser, setUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser({
        id:user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        username: user.displayName.toLowerCase().split(" ").join(""),
      });
    });
    return  () =>  unsubscribe;
  }, [currentUser]);

  const logOut = async () => {
    await auth.signOut(auth.currentUser);
    navigate("/");
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setError(true);
      toast.error(error.message);
      navigate("/");
    }
  };

  const values = {
    error,
    currentUser,
    logOut,
    googleSignIn,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
