import WrapperSide from "./leftSide/WrapperSide";
import MessageRoom from "./messageBox/MessageRoom";
import ContactDetail from "./ContactDetail/ContactDetail";
import { CSSTransition } from "react-transition-group";
import style from "./animateContentDetail.module.css";
import LayoutHome from "./LayoutHome";
import { useSelector } from "react-redux";
function Home() {
  const showDetail = useSelector((state) => state.Toggle.showDetail);
  return (
    <LayoutHome>
      <WrapperSide />
      <MessageRoom />
      {/* animate contactDetail */}
      <CSSTransition
        in={showDetail}
        timeout={{
          enter: 700,
          exit: 1500,
        }}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: style["contentDetail-enter-active"],
          exitActive: style["contentDetail-exit-active"],
        }}
      >
        <ContactDetail />
      </CSSTransition>
    </LayoutHome>
  );
}

export default Home;
