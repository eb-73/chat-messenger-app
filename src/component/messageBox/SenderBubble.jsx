import style from "./SenderBubble.module.css";
import avatarSender from "../../Assets/image/avatar2.jpg";
import { useRef, useEffect } from "react";
import Moment from "react-moment";
const SenderBubble = (props) => {
  const elementInView = useRef(null);
  //scroll to last message automatically by fetch message
  useEffect(() => {
    elementInView.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messageContent]);
  return (
    <div className={style.senderBubble} ref={elementInView}>
      <div className={style.message}>
        {props.image && <img src={props.image} />}
        <p>{props.messageContent}</p>
      </div>
      <div className={style.avatar}>
        <img src={avatarSender} alt="avatar pic" />
        <h6 className={style.messageTime}>
          <Moment fromNow>{props.createdAt}</Moment>
        </h6>
      </div>
    </div>
  );
};

export default SenderBubble;
