import style from "./SideForm.module.css";
function SideSignup(props) {
  return (
    <div className={style.sideForm}>
      <h1>welcome back!</h1>
      <button onClick={props.change}>Login</button>
    </div>
  );
}

export default SideSignup;
