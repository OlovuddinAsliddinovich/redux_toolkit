import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { AiOutlineSun } from "react-icons/ai";
import { GiNightSky } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../slice/auth";
import {
  getModeItem,
  removeItem,
  setModeItem,
} from "../helpers/persistance-storage";

const Navbar = ({ mode, setMode }) => {
  const { user, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modeHandler = () => {
    setMode(!mode);
    setModeItem("mode", !mode);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getModeItem("mode");
  }, []);
  return (
    <div className="d-flex flex-column flex-md-row align-items-center py-2 border-bottom">
      <Link to={"/"} style={{ color: mode ? "white" : "black" }}>
        <img
          src={logo}
          alt="img"
          style={{ width: "200px", height: "80px", borderRadius: "10px" }}
        />
      </Link>

      <nav
        className="d-flex justify-content-center align-items-center ms-auto "
        style={{ height: "80px" }}
      >
        {loggedIn ? (
          <>
            <Link
              to={"/create-article"}
              className="me-3 py-2 link-body-emphasis text-decoration-none"
            >
              <span style={{ color: mode ? "white" : "black" }}>
                Create Article
              </span>
            </Link>

            <span
              className="me-3 py-2 text-decoration-none"
              style={{ color: mode ? "white" : "black" }}
            >
              {user.username}
            </span>
            <button
              className={`btn btn-outline-danger me-3 py-2 link-body-emphasis text-decoration-none text-${
                mode ? "white" : "black"
              }`}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="me-3 py-2 link-body-emphasis text-decoration-none"
            >
              <span style={{ color: mode ? "white" : "black" }}>Login</span>
            </Link>
            <Link
              to={"/register"}
              className="me-3 py-2 link-body-emphasis text-decoration-none"
            >
              <span style={{ color: mode ? "white" : "black" }}>Register</span>
            </Link>
          </>
        )}

        <button
          style={{
            border: "none",
            width: "40px",
            height: "40px",
            background: "none",
            fontSize: "30px",
            marginTop: "-10px",
            cursor: "pointer",
            color: mode ? "white" : "black",
          }}
          onClick={modeHandler}
        >
          {mode ? (
            <GiNightSky
              width={"40px"}
              className={`icon-mode ${mode ? "night" : ""}`}
              style={{ borderRadius: "50%" }}
              height={"40px"}
            />
          ) : (
            <AiOutlineSun
              width={"40px"}
              className={`icon-mode ${mode ? "" : "sun"}`}
              style={{ borderRadius: "50%" }}
              height={"40px"}
            />
          )}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
