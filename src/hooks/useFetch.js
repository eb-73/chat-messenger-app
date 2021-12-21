import { auth, db } from "../firebase/config";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function useFetch(form) {
  const sendUser = async (name, email, password) => {
    if (form === "signup") {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uID: userCredential.user.uid,
        name,
        email,
        createdAt: new Date().toString(),
        lastSeen: new Date().toString(),
        isOnline: true,
        typing: false,
      });
    } else if (form === "login") {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateDoc(doc(db, "users", userCredential.user.uid), {
        isOnline: true,
        lastSeen: new Date().toString(),
      });
    }
  };
  return sendUser;
}

export const errorMessage = (error) => {
  switch (error) {
    case "auth/invalid-email":
      return " email address is not valid";
    case "auth/email-already-in-use":
      return "Username already exists";
    case "auth/user-not-found":
      return "Username not exists";
    case "auth/weak-password":
      return "Password is not strong enough";
    case "auth/wrong-password":
      return "Password is incorrect try again";
    default:
      return "Something is wrong";
  }
};
export default useFetch;
