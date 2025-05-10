import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../../redux/hooks/index.ts";
import { useAuth } from "../../../shared/contexts/AuthContext.tsx";
import logoicon from "../../../shared/media/images/logoicon.png";
import { loginSchema } from "../../../validation/index.tsx";
interface LoginFormInputs {
  email: string;
  password: string;
}
const SignIn = () => {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const { result } = useAppSelector((state) => state.auth);
  const content = useAppSelector((state) => state.auth.list);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const otpResult = useAppSelector((state) => state.otpVerification.result);
  console.log("otp result", otpResult);
  useEffect(() => {
    if (otpResult?.success) {
      toast.success("You registered successfully! Please login", {
        autoClose: 10000,
        position: "top-left",
      });
    }
  }, [otpResult]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;

    try {
      await loginAuth(email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    const isAnyUserActive =
      Array.isArray(content) &&
      content.some((details) => details.status === "Active");

    if (
      result &&
      result?.token &&
      result?.status === "succeeded" &&
      isAnyUserActive
    ) {
      localStorage.setItem("token", result?.token);
      navigate("/");
    } else {
      localStorage.setItem("token", "");
      navigate("/login");
    }
  }, [result, content, navigate]);

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <link rel="icon" href={logoicon} />
      </Helmet>
      <div className="form-container sign-in-container">
        <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          {errorMessage && (
            <h3 className="error-message mt-2">{errorMessage}</h3>
          )}
          <div className="form-group mt-4">
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ position: "absolute", bottom: "63px", right: "30px" }}
            >
              {showPassword ? (
                <i
                  className="fa fa-eye-slash"
                  aria-hidden="true"
                  style={{ color: "var(--primary-color)" }}
                ></i>
              ) : (
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                  style={{ color: "var(--primary-color)" }}
                ></i>
              )}
            </span>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button disabled={false}>Sign In</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;
