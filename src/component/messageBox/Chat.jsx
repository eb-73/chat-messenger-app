import { useEffect, useState } from "react";
import style from "./Chat.module.css";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { db, auth } from "../../firebase/config";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";

function Chat() {
  const [messages, setMessages] = useState([]);
  const currentUserID = auth.currentUser.uid;
  const toUserID = useSelector((state) => state.ChatWith.to);
  // create message id by combine sender's id and receiver's id
  let messageID =
    currentUserID > toUserID
      ? `${currentUserID + toUserID}`
      : `${toUserID + currentUserID}`;
  // get conversation between to user in database
  useEffect(() => {
    const ref = collection(db, "messages", messageID, "chat");
    const q = query(ref, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messageArray = [];
      snapshot.forEach((item) => {
        messageArray.push(item.data());
      });

      setMessages(messageArray);
    });

    return () => {
      unsubscribe();
    };
  }, [messageID]);

  let startChat;
  if (messages.length === 0) {
    startChat = <p className={style.firstChat}>No message here yet...</p>;
  } else {
    startChat = messages.map((message) => {
      if (message.from === currentUserID) {
        return (
          <SenderBubble
            key={message.uID}
            createdAt={message.createdAt}
            messageContent={message.text}
            image={message.imgUrl}
          />
        );
      } else {
        return (
          <RecieverBubble
            key={message.uID}
            createdAt={message.createdAt}
            messageContent={message.text}
            image={message.imgUrl}
          />
        );
      }
    });
  }
  return <div className={style.chat}>{startChat}</div>;
}

export default Chat;
