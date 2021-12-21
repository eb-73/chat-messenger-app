import React, { useState } from "react";
import Header from "./Header";
import TypeBox from "./TypeBox";
import style from "./MessageRoom.module.css";
import Chat from "./Chat";
import AtachFile from "./AtachFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function MessageRoom() {
  const [img, setImg] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const showDetail = useSelector((state) => state.Toggle.showDetail);
  const showChat = useSelector((state) => state.ChatWith.showChat);

  const changeImage = async (imgFile) => {
    //to show attachPage imediatly with selected pic
    if (imgFile) {
      const prevUrl = URL.createObjectURL(imgFile);
      setShowImage(prevUrl);
    }
    //to upload image and create link
    setImg(imgFile);
  };
  const cancelAttach = () => {
    setImg("");
    setShowImage("");
  };
  return (
    <main className={`${style.messageBox} ${showDetail && style.animate}`}>
      {showChat && (
        <>
          <Header />
          {showImage && (
            <AtachFile
              imageUrl={img}
              prevUrl={showImage}
              onExit={cancelAttach}
            />
          )}
          {!showImage && <Chat />}
          {!showImage && <TypeBox changeImage={changeImage} />}
        </>
      )}
      {!showChat && (
        <div className={style.emptyPage}>
          <p>Tap one contact to chat with him ...</p>
          <div className={style.handIcon}>
            <FontAwesomeIcon icon={faHandPointer} />
          </div>
          <footer>Designed and developed by Ebrahim❤️.</footer>
        </div>
      )}
    </main>
  );
}

export default MessageRoom;
