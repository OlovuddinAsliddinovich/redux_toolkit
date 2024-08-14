import { useState } from "react";
import ArticleForm from "./article-form";
import { ArticleService } from "../service/article";
import { useNavigate } from "react-router-dom";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import { useDispatch } from "react-redux";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    const newArticle = { title, description, body };
    try {
      await ArticleService.PostArticle(newArticle);
      dispatch(postArticleSuccess());
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(postArticleFailure());
    }
  };

  const formProps = {
    title,
    setTitle,
    body,
    setBody,
    description,
    setDescription,
    formSubmitHandler,
  };

  return (
    <div>
      <h1 className="text-center">Create Article</h1>
      <ArticleForm {...formProps} />
    </div>
  );
};

export default CreateArticle;
