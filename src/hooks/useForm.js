import { useState } from "react";
function useForm(mode) {
  const [input, setInput] = useState("");
  const [touched, setTouched] = useState(false);

  let validateInput;
  if (mode === "text") {
    validateInput = input.trim().length > 2;
  } else if (mode === "email") {
    validateInput = input.includes("@") && input.includes(".com");
  } else if (mode === "pass") {
    validateInput = input.length >= 8;
  }
  let inputIsNotValid = !validateInput && touched;

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const inputBlurHandler = () => {
    console.log("blur");
    setTouched(true);
  };
  const clearInput = () => {
    setInput("");
    setTouched(false);
  };

  return {
    inputValue: input,
    validateInput,
    inputIsNotValid,
    change: inputChangeHandler,
    blur: inputBlurHandler,
    clear: clearInput,
  };
}

export default useForm;
