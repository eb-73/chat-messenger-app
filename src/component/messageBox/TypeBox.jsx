import style from "./TypeBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import {
  collection,
  doc,
  Timestamp,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function TypeBox(props) {
  const currentUserID = auth.currentUser.uid;
  const [textValue, setTextValue] = useState("");
  const toUserID = useSelector((state) => state.ChatWith.to);
  let messageID =
    currentUserID > toUserID
      ? `${currentUserID + toUserID}`
      : `${toUserID + currentUserID}`;
  //set typing mode for user
  useEffect(() => {
    let identifier;
    const ref = doc(db, "users", currentUserID);
    const setTyping = async () => {
      await updateDoc(ref, {
        typing: true,
      });
      identifier = setTimeout(async () => {
        await updateDoc(ref, {
          typing: false,
        });
      }, 1500);
    };
    setTyping();
    return () => {
      clearTimeout(identifier);
    };
  }, [textValue]);

  const changeHandler = (e) => {
    setTextValue(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setTextValue("");
    // check to unable send space message
    if (textValue) {
      //set message document in collection
      const ref = collection(db, "messages", messageID, "chat");
      await addDoc(ref, {
        from: currentUserID,
        to: toUserID,
        text: textValue,
        createdAt: new Date().toString(),
      });
      //set last message
      const refLastM = doc(db, "lastMessage", messageID);
      await setDoc(refLastM, {
        from: currentUserID,
        to: toUserID,
        text: textValue,
        createdAt: new Date().toString(),
        unRead: true,
      });
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className={style.typeBox}>
      <div className={style.inputGroup}>
        <input
          type="text"
          spellCheck="false"
          value={textValue}
          onChange={changeHandler}
          placeholder="Type your message here..."
        />
        <button type="button" className={style.atachIcon}>
          <FontAwesomeIcon icon={faPaperclip} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => props.changeImage(e.target.files[0])}
          />
        </button>
      </div>
      <button className={style.send} type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

export default TypeBox;
