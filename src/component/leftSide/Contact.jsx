import style from "./Contact.module.css";
import avatarURL from "../../Assets/image/default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { chatWithAction } from "../../store/slices/ChatWith";
import { auth, db } from "../../firebase/config";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Moment from "react-moment";
const messageTimeType = {
  sameDay: "HH:mm",
  nextDay: "DD/MM/YYYY",
  nextWeek: "DD/MM/YYYY",
  lastDay: "[Yesterday]",
  lastWeek: "DD/MM/YYYY",
  sameElse: "DD/MM/YYYY",
};
function Contact(props) {
  const [lastMessage, setLastMessage] = useState({
    text: "",
    id: null,
    time: "",
  });
  const [isNewMessage, setIsNewMessage] = useState(false);
  const dispatch = useDispatch();
  const secoundUser = useSelector((state) => state.ChatWith.to);
  const currentUserID = auth.currentUser.uid;
  const toUserID = props.id;
  let messageID =
    currentUserID > toUserID
      ? `${currentUserID + toUserID}`
      : `${toUserID + currentUserID}`;

  // listen to lastMessage collection for new message(last message)
  useEffect(() => {
    const ref = doc(db, "lastMessage", messageID);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      //if doc is exists, set last message

      if (snapshot.exists()) {
        setLastMessage({
          id: snapshot.data().from,
          text: snapshot.data().text,
          time: snapshot.data().createdAt,
        });

        if (snapshot.data().to === currentUserID) {
          setIsNewMessage(snapshot.data().unRead);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [messageID, currentUserID]);
  //set chat with users
  const setChatHandler = async () => {
    dispatch(
      chatWithAction.setChat({
        from: currentUserID,
        to: props.id,
        name: props.name,
      })
    );
    //read message that recieve
    if (lastMessage.id === props.id) {
      const ref = doc(db, "lastMessage", messageID);
      await updateDoc(ref, {
        unRead: false,
      });
      //for expect read message that send by me
    } else if (lastMessage.id === currentUserID) {
      setIsNewMessage(false);
    }
  };

  return (
    <div
      onClick={setChatHandler}
      className={`${style.contact} ${
        props.id === secoundUser ? style.selectContact : null
      }`}
    >
      {/* <div className={style.index}></div> */}

      <div className={style.avatar}>
        <img src={props.picUrl || avatarURL} alt="profile" />
        <div
          className={`${style.online} ${props.isOnline && style.isOnline}`}
        ></div>
      </div>
      <div className={style.name}>
        <h2>{props.name}</h2>
        {/* for change between typing mode and lastMessage */}
        {props.typing ? (
          <p className={style.typing}>typing...</p>
        ) : (
          <p className={style.lastMessage}>{`${
            lastMessage.id === currentUserID ? "me: " : ""
          }${lastMessage.text}`}</p>
        )}
      </div>
      <div className={style["notif-time"]}>
        <div className={style.lastMTime}>
          {lastMessage.time && (
            <Moment calendar={messageTimeType}>{lastMessage.time}</Moment>
          )}
        </div>
        {isNewMessage ? <div className={style.badge}>new</div> : <div />}
      </div>
    </div>
  );
}

export default Contact;
