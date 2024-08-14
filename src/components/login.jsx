import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/input";
import Button from "../ui/button";
import { imgLogin } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import { ApiService } from "../service/auth";
import ValidationError from "./validation-error";

const Login = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await ApiService.userLogin(user);
      dispatch(signUserSuccess(response?.user));
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      dispatch(signUserFailure(error?.response?.data?.errors));
    }
  };
  return (
    <div className="row justify-content-center align-items-start ">
      <form
        className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-3"
        onSubmit={handleSubmit}
      >
        <img
          className="my-4 mx-auto"
          src={imgLogin}
          alt="login"
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className="h3 mb-3 fw-normal mx-auto">Please sign in</h1>

        <ValidationError />

        <div className="form-group">
          <Input
            label={"Email address"}
            type={"email"}
            state={email}
            setState={setEmail}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <Input
            label={"Password"}
            type={"password"}
            state={password}
            setState={setPassword}
            className="form-control"
          />
        </div>

        <Button
          value={"Log in"}
          type={"submit"}
          isLoading={isLoading}
          className="btn btn-primary"
        />

        <Link to={"/register"} className="mx-auto">
          <p
            className={`mt-2 mb-3 ${
              mode ? "text-light" : "text-dark"
            } mx-auto underline`}
          >
            Please here to - Sign up
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
