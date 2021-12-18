import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function useAuth() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user#cd")));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("user#cd", JSON.stringify({
          email : user.email,
          uid : user.uid
        }))
      } else {
        setCurrentUser(null);
        localStorage.clear()
      }
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        setCurrentUser(response.user)
        resolve(response.user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(response.user)
        resolve(response.user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signout = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await signOut(auth);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { currentUser, signin, signout, signup };
}

export default useAuth;