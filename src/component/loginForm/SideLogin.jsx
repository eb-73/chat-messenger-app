import style from "./SideForm.module.css";
function SideLogin(props) {
  return (
    <div className={style.sideForm}>
      <h1>Hello, Friend!</h1>

      <button onClick={props.change}>Signup</button>
    </div>
  );
}

export default SideLogin;
