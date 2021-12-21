import style from "./LayoutHome.module.css";
function LayoutHome(props) {
  return <main className={style.main}>{props.children}</main>;
}

export default LayoutHome;
