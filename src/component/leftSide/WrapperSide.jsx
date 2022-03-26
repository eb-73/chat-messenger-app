import style from "./WrapperSide.module.css";
import Side from "./Side";
import Profile from "./Profile";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
function WrapperSide() {
  const showDetail = useSelector((state) => state.Toggle.showDetail);
  const showProfile = useSelector((state) => state.Toggle.showProfile);
  return (
    <div className={`${style.wrapperSide} ${showDetail && style.animate}`}>
      <CSSTransition
        in={!showProfile}
        timeout={{
          enter: 800,
          exit: 200,
        }}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: style["side-enter-active"],
          exitActive: style["side-exit-active"],
        }}
      >
        <Side />
      </CSSTransition>
      <CSSTransition
        in={showProfile}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: style["profile-enter-active"],
          exitActive: style["profile-exit-active"],
        }}
      >
        <Profile />
      </CSSTransition>
    </div>
  );
}

export default WrapperSide;
