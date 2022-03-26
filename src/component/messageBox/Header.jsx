import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { toggleAction } from "../../store/slices/Toggle";

const lastSeenType = {
  sameDay: "[last seen today at] HH:mm",
  nextDay: "[last seen at] DD/MM/YYYY",
  nextWeek: "[last seen at] DD/MM/YYYY",
  lastDay: "[last seen yesterday at] HH:mm",
  lastWeek: "[last seen at] DD/MM/YYYY",
  sameElse: "[last seen at] DD/MM/YYYY",
};
function Header() {
  const dispatch = useDispatch();
  const [onlineStatus, setOnlineStatus] = useState({
    isOnline: false,
    lastSeen: "",
  });
  const { name: userName, to: toUserID } = useSelector(
    (state) => state.ChatWith
  );
  //get last seen and onlineStatus from database
  useEffect(() => {
    let online = false;
    const unsubscribe = onSnapshot(doc(db, "users", toUserID), (snapshot) => {
      if (snapshot.exists()) {
        // console.log("dfds", snapshot.data().lastSeen.toDate());
        setOnlineStatus({
          isOnline: snapshot.data().isOnline,
          lastSeen: snapshot.data().lastSeen,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [toUserID]);
  //show user detail by click
  const showDetailHandler = () => {
    dispatch(toggleAction.showDetail());
  };
  return (
    <header className={style.header}>
      <div onClick={showDetailHandler} className={style.status}>
        <div
          className={`${style.online} ${
            onlineStatus.isOnline ? style.isOnline : style.isOffline
          }`}
        />
        <div className={style.name}>
          <h3>{userName}</h3>
          <h6>
            {onlineStatus.isOnline ? (
              "online"
            ) : (
              <Moment calendar={lastSeenType}>{onlineStatus.lastSeen}</Moment>
            )}
          </h6>
        </div>
      </div>

      <div className={style.headerIcon}>
        <div className={style.icon}>
          <FontAwesomeIcon icon={faPhoneAlt} />
        </div>

        <div className={style.icon}>
          <FontAwesomeIcon icon={faVideo} />
        </div>
      </div>
    </header>
  );
}

export default Header;
