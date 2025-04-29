import React from "react";
import SignupasDoctor from "../../components/SignupasDoctor";
import SignupasPatient from "../../components/SignupasPatient";
import { IToggle } from "../../models";

const SignupPage: React.FC<IToggle> = ({ toggleSwitch, role }) => {
  return (
    <div className="signup-toggle-container">
      <label className="switch-signup" onClick={toggleSwitch}>
        <div
          className={`signup-slider signup-round ${
            role === "doctor" ? "round-checked" : ""
          }`}
        >
          <div className="signup-slider-content">
            <div> I am patient</div>
            <div> I am doctor</div>
          </div>
        </div>
      </label>
      <div className="text-container">
        {role === "doctor" ? (
          <SignupasDoctor role={role} />
        ) : (
          <SignupasPatient role={role} />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
