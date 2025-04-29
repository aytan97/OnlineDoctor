import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import OverLay from "../auth/OverLay";
import React, { useState } from "react";
import { IToggle } from "../../shared/models";

const Auth: React.FC<IToggle> = ({ toggleSwitch, role }) => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login-container">
      <div
        className={`container login ${signIn ? "right-panel-active" : ""} `}
        id="container"
      >
        <SignUp toggleSwitch={toggleSwitch} role={role} />
        <SignIn />
        <OverLay signIn={signIn} setSignIn={setSignIn} />
      </div>
    </div>
  );
};

export default Auth;
