import style from "./RecieverBubble.module.css";
import avatarReciever from "../../Assets/image/avatar1.jpg";
import { useRef, useEffect } from "react";
import Moment from "react-moment";
const RecieverBubble = (props) => {
  const elementInView = useRef(null);
  useEffect(() => {
    elementInView.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messageContent]);

  return (
    <div className={style.recieverBubble} ref={elementInView}>
      <div className={style.avatar}>
        <img src={avatarReciever} alt="avatar pic" />
        <h6 className={style.messageTime}>
          <Moment fromNow>{props.createdAt}</Moment>
        </h6>
      </div>
      <div className={style.message}>
        {props.image && <img src={props.image} />}
        <p>{props.messageContent}</p>
      </div>
    </div>
  );
};

export default RecieverBubble;
