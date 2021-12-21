import React, { useState } from "react";
import LayoutLogin from "./LayoutLogin";

import Login from "./Login";
import Signup from "./Signup";
import SideLogin from "./SideLogin";
import SideSignup from "./SideSignup";

function EnterPage() {
  const [loginMode, setLoginMode] = useState(false);
  const changeMode = () => {
    setLoginMode((prevState) => !prevState);
  };
  return (
    <LayoutLogin>
      {loginMode && <SideLogin change={changeMode} />}
      {loginMode && <Login />}
      {!loginMode && <SideSignup change={changeMode} />}
      {!loginMode && <Signup />}
    </LayoutLogin>
  );
}

export default EnterPage;
