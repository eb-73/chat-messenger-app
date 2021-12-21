import style from "./ContactDetail.module.css";
import avatarURL from "../../Assets/image/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMobile,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { onSnapshot, doc } from "@firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { toggleAction } from "../../store/slices/Toggle";
function ContactDetail() {
  const dispatch = useDispatch();
  const [userDetail, setUerDetail] = useState({
    name: "",
    status: "",
    email: "",
    picUrl: null,
  });
  const userID = useSelector((state) => state.ChatWith.to);
  useEffect(() => {
    const ref = doc(db, "users", userID);
    onSnapshot(ref, (userD) => {
      if (userD.exists()) {
        setUerDetail({
          name: userD.data().name,
          email: userD.data().email,
          status: userD.data().isOnline,
          picUrl: userD.data().profileUrl,
        });
      }
    });
  }, [userID]);
  const hideDetailHandler = () => {
    dispatch(toggleAction.hideDetail());
  };
  return (
    <div className={style.contactDetail}>
      <div className={style.dismis}>
        <div onClick={hideDetailHandler} className={style.closeIcon}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className={style.userImage}>
        <img
          className={userDetail.status ? style.isOnline : style.isOffline}
          src={userDetail.picUrl || avatarURL}
          alt="contact-image"
        />
      </div>
      <h2 className={style.name}>{userDetail.name.toUpperCase()}</h2>
      <h3
        className={`${style.onlineStatus} ${
          userDetail.status ? style.isOnline : style.isOffline
        }`}
      >
        {userDetail.status ? "Online" : "Offline"}
      </h3>
      <div className={style.information}>
        <div className={style.phone}>
          <div className={style.phoneIcon}>
            <FontAwesomeIcon icon={faMobile} />
          </div>
          <p>Phone:+99 314 215</p>
        </div>
        <div className={style.email}>
          <div className={style.emailIcon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p>{`Email:${userDetail.email}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;
