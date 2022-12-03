import React, { useEffect, useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/AuthService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    Loading.remove();
    if (sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  //   const notify = () => toast("Wow so easy!");
  const loginHandler = () => {
    // if(username && password){
    //   const payload = { username, password };
    //   console.log(AuthService.login(payload))
    // }
    // notify()
    if (username && password) {
      const payload = { username, password };
      Loading.standard("Loading...");
      AuthService.login(payload)
        .then((res) => {
          console.log(res);
          //getdata
          const user = {
            id: res.data.data.id,
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            gender: res.data.data.gender,
            role: res.data.data.role.name,
            locationId: res.data.data.location.id,
            accessToken: res.data.data.accessToken,
            status: res.data.data.state,
          };
          sessionStorage.clear();
          sessionStorage.setItem("user", JSON.stringify(user));
          Loading.remove();
          toast.success("Login success!!!", {
            position: toast.POSITION.TOP_CENTER,
            className: "border border-success text-success",
          });
          navigate("/");
        })
        .catch((res) => {
          Loading.remove();
          toast.error("Username or password is incorrect. Please try again", {
            position: toast.POSITION.TOP_CENTER,
            className: "border border-danger text-danger",
          });
          return null;
        });
    } else {
      Loading.remove();
      toast.warning("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="form__container">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/logo-outline.png"}
            alt="logo"
            className="form__logo"
          />
        </div>
        <div className="form__input-wrapper">
          <label
            className="float-start text-white"
            style={{ fontWeight: "500", fontSize: "18px" }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form__input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className="float-start text-white"
            style={{ fontWeight: "500", fontSize: "18px" }}
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form__input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              position: " absolute",
              right: "75px",
              bottom: "162px",
              with: "20px",
              height: "20px",
            }}
          >
            {!showPassword ? (
              <AiFillEye onClick={() => setShowPassword(true)}></AiFillEye>
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPassword(false)}
              ></AiFillEyeInvisible>
            )}
          </div>
        </div>

        {/* <button
          type="submit"
          className="form__button"
          onClick={loginHandler}
          disabled={!(username && password)}
          id="btnLogin"
        >
          Login
        </button> */}
        <Button
          onClick={loginHandler}
          disabled={!(username && password)}
          variant="light"
          className="px-4"
          style={{ fontWeight: "500" }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
