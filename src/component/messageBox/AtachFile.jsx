import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./AtachFile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth, db, storage } from "../../firebase/config";
import { setDoc, addDoc, doc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
function AtachFile(props) {
  const currentUserID = auth.currentUser.uid;
  const [textValue, setTextValue] = useState("");
  const toUserID = useSelector((state) => state.ChatWith.to);
  let messageID =
    currentUserID > toUserID
      ? `${currentUserID + toUserID}`
      : `${toUserID + currentUserID}`;
  const changeHandler = (e) => {
    setTextValue(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setTextValue("");
    //upload image
    const imageRef = ref(
      storage,
      `images/${messageID}/${new Date().getTime()}-${props.imageUrl.name}`
    );
    const url = await uploadBytes(imageRef, props.imageUrl);
    const downloadUrl = await getDownloadURL(ref(storage, url.ref.fullPath));
    //set message document in collection
    const reff = collection(db, "messages", messageID, "chat");
    await addDoc(reff, {
      from: currentUserID,
      to: toUserID,
      text: textValue,
      imgUrl: downloadUrl,
      createdAt: new Date().toString(),
    });
    //set last message
    const refLastM = doc(db, "lastMessage", messageID);
    await setDoc(refLastM, {
      from: currentUserID,
      to: toUserID,
      text: textValue,
      imgUrl: downloadUrl,
      createdAt: new Date().toString(),
      unRead: true,
    });
    props.onExit();
  };
  return (
    <div className={style.atachFile}>
      <div className={style.imagePreview}>
        <div className={style.exit} onClick={props.onExit}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <img src={props.prevUrl} />
      </div>
      <form className={style.typeBox} onSubmit={onSubmitHandler}>
        <div className={style.inputGroup}>
          <input
            type="text"
            onChange={changeHandler}
            placeholder="Type your message here..."
          />
        </div>
        <button className={style.send} type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default AtachFile;
