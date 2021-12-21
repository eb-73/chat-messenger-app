import { useEffect, useRef } from "react";
import { updateDoc, doc, Timestamp } from "@firebase/firestore";
import { db, auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import style from "./Menu.module.css";
import { toggleAction } from "../../store/slices/Toggle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
function Menu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useRef(null);
  const logoutHandler = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
      lastSeen: new Date().toString(),
    });
    await signOut(auth);
    navigate("/login", { replace: true });
  };
  const showProfileHandler = () => {
    dispatch(toggleAction.showProfile());
  };
  const outSideClick = (e) => {
    e.stopPropagation();
    if (e.target === menu.current) {
      console.log("naa");
    } else {
      props.closeMenu();
    }
  };
  // for click outside of menu dropdown and close it
  useEffect(() => {
    document.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  }, []);
  return (
    <div className={style.menu} ref={menu}>
      <div className={style.menuButton}>
        <button onClick={showProfileHandler}>Profile</button>
      </div>
      <div className={style.menuButton}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
}

export default Menu;
