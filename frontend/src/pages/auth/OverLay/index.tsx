import { Link, useNavigate } from "react-router-dom";
import logo2white from "/src/shared/media/images/logo2white.png";
import { TOverlay } from "../../../shared/models";
const OverLay = ({ signIn, setSignIn }: TOverlay) => {
  const navigate = useNavigate();

  const toggleSignIn = () => {
    setSignIn((prev: boolean) => !prev);

    navigate(signIn ? "/login" : "/register");
  };

  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <div className="mb-3">
            <Link to="/" className="nav-logo">
              <img src={logo2white} />
            </Link>
            <h3>Together, we can make a difference in health outcomes </h3>
          </div>
          <h2>Happy to see you there!</h2>
          <p>If you have an account, please sign in </p>
          <button
            type="button"
            onClick={toggleSignIn}
            className="ghost"
            id="SignIn"
          >
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <div className="mb-3">
            <Link to="/" className="nav-logo">
              <img src={logo2white} />
            </Link>
            <h3>Together, we can make a difference in health outcomes </h3>
          </div>
          <h2>Welcome Back!</h2>
          <p>If you do not have an account, please register first </p>
          <button
            type="button"
            onClick={toggleSignIn}
            className="ghost"
            id="SignUp"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverLay;
