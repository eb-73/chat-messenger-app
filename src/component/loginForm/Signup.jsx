import style from "./Signup.module.css";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { errorMessage } from "../../hooks/useFetch";
import { useNavigate } from "react-router";
function Signup() {
  const signupUser = useFetch("signup");
  const navigate = useNavigate();
  const {
    inputValue: nameValue,
    validateInput: validateName,
    inputIsNotValid: nameIsNotValid,
    change: changeName,
    blur: blurName,
    clear: clearName,
  } = useForm("text");
  const {
    inputValue: emailValue,
    validateInput: validateEmail,
    inputIsNotValid: emailIsNotValid,
    change: changeEmail,
    blur: blurEmail,
    clear: clearEmail,
  } = useForm("email");
  const {
    inputValue: firstPassValue,
    validateInput: validateFirstPass,
    inputIsNotValid: firstPassIsNotValid,
    change: changeFirstPass,
    blur: blurFirstPass,
    clear: clearFirstPass,
  } = useForm("pass");
  const {
    inputValue: secoundPassValue,
    validateInput: validateSecoundPass,
    inputIsNotValid: secoundPassIsNotValid,
    change: changeSecoundPass,
    blur: blurSecoundPass,
    clear: clearSecoundPass,
  } = useForm("pass");
  const formIsValid =
    validateEmail &&
    validateFirstPass &&
    validateSecoundPass &&
    firstPassValue === secoundPassValue;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    clearName();
    clearEmail();
    clearFirstPass();
    clearSecoundPass();

    toast.promise(signupUser(nameValue, emailValue, secoundPassValue), {
      loading: "Loading",
      success: (data) => {
        navigate("/main", { replace: true });
        return `Successfully signed`;
      },
      error: (err) => errorMessage(err.code),
    });
  };

  return (
    <div className={style.signupForm}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            value={nameValue}
            onChange={changeName}
            onBlur={blurName}
            className={style.input}
            placeholder="Your name"
            name="text"
          />
          {nameIsNotValid && (
            <FontAwesomeIcon className={style.notValid} icon={faTimesCircle} />
          )}
          {validateName && (
            <FontAwesomeIcon className={style.valid} icon={faCheck} />
          )}
        </div>
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
            value={firstPassValue}
            onChange={changeFirstPass}
            onBlur={blurFirstPass}
            className={style.input}
            placeholder="Password"
            name="password"
          />
          {firstPassIsNotValid && (
            <FontAwesomeIcon className={style.notValid} icon={faTimesCircle} />
          )}
          {validateFirstPass && (
            <FontAwesomeIcon className={style.valid} icon={faCheck} />
          )}
        </div>
        <div className={style.inputGroup}>
          <FontAwesomeIcon icon={faKey} />
          <input
            type="password"
            value={secoundPassValue}
            onChange={changeSecoundPass}
            onBlur={blurSecoundPass}
            className={style.input}
            placeholder="Repeat the Password"
            name="password"
          />
          {secoundPassIsNotValid && (
            <FontAwesomeIcon className={style.notValid} icon={faTimesCircle} />
          )}
          {validateSecoundPass && (
            <FontAwesomeIcon className={style.valid} icon={faCheck} />
          )}
        </div>
        <div className={style.inputGroup}>
          <button
            type="submit"
            className={style.button}
            disabled={!formIsValid}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
