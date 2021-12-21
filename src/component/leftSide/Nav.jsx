import React, { useState } from "react";
import style from "./Nav.module.css";
import { toggleAction } from "../../store/slices/Toggle";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";

function Nav() {
  const dispatch = useDispatch();
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleMenu = () => {
    setDisplayMenu((prevState) => !prevState);
  };

  const disAppearMenu = () => {
    setDisplayMenu(false);
  };
  const showProfileHandler = () => {
    dispatch(toggleAction.showProfile());
  };
  return (
    <nav className={style.nav}>
      <h1 onClick={showProfileHandler}>Logo</h1>
      <div className={style.menuIcon} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faEllipsisV} />
        {displayMenu && <Menu closeMenu={disAppearMenu} />}
      </div>
    </nav>
  );
}

export default Nav;
