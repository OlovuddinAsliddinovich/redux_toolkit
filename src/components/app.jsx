import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ArticleDetail,
  CreateArticle,
  EditArticle,
  ErrorPage,
  Login,
  Main,
  Navbar,
  Register,
} from "./";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { ApiService } from "../service/auth";
import { getItem } from "../helpers/persistance-storage";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "../slice/auth";
const App = () => {
  const defaultMode = JSON.parse(localStorage.getItem("mode"));
  const [mode, setMode] = useState(defaultMode);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await ApiService.getUser();
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log("Error App");
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  useCallback(() => {
    localStorage.getItem("mode");
  }, [mode]);
  return (
    <div
      className={mode ? "bg-dark" : "bg-light"}
      style={{
        background: mode ? "" : "white",
        color: mode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <Navbar mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Main mode={mode} />} />
          <Route path="/login" element={<Login mode={mode} />} />
          <Route path="/register" element={<Register mode={mode} />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:slug" element={<EditArticle />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
