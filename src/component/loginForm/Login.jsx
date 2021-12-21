import style from "./Login.module.css";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { errorMessage } from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import {
  faEnvelope,
  faKey,
  faCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
function Login() {
  const loginUser = useFetch("login");
  const navigate = useNavigate();
  const {
    inputValue: emailValue,
    validateInput: validateEmail,
    inputIsNotValid: emailIsNotValid,
    change: changeEmail,
    blur: blurEmail,
    clear: clearEmail,
  } = useForm("email");
  const {
    inputValue: passValue,
    validateInput: validatePass,
    inputIsNotValid: passIsNotValid,
    change: changePass,
    blur: blurPass,
    clear: clearPass,
  } = useForm("pass");
  const formIsValid = validateEmail && validatePass;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    clearEmail();
    clearPass();
    toast.promise(loginUser(null, emailValue, passValue), {
      loading: "Loading",
      success: (data) => {
        navigate("/main", { replace: true });
        return `Wellcome!`;
      },
      error: (err) => errorMessage(err.code),
    });
  };

  return (
    <div className={style.loginForm}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            value={emailValue}
            onChange={changeEmail}
            onBlur={blurEmail}
            className={style.input}
            placeholder="Email"
            name="email"
          />
          {emailIsNotValid && (
            <FontAwesomeIcon className={style.notValid} icon={faTimesCircle} />
          )}
          {validateEmail && (
            <FontAwesomeIcon className={style.valid} icon={faCheck} />
          )}
        </div>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faKey} />
          <input
            type="password"
            value={passValue}
            onChange={changePass}
            onBlur={blurPass}
            className={style.input}
            placeholder="Password"
            name="password"
          />
          {passIsNotValid && (
            <FontAwesomeIcon className={style.notValid} icon={faTimesCircle} />
          )}
          {validatePass && (
            <FontAwesomeIcon className={style.valid} icon={faCheck} />
          )}
        </div>
        <div className={style.inputGroup}>
          <button
            type="submit"
            className={style.button}
            disabled={!formIsValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
