import style from "./LayoutLogin.module.css";
function LayoutLogin(props) {
  return <main className={style.main}>{props.children}</main>;
}

export default LayoutLogin;
