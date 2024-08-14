import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "./article-form";
import { ArticleService } from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";

const EditArticle = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      setTitle(response.article.title);
      setDescription(response.article.description);
      setBody(response.article.body);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      dispatch(getArticleDetailFailure());

      console.log(error);
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, []);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    const article = { title, description, body };
    try {
      const response = await ArticleService.editArticle(slug, { article });
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
      <h1 className="text-center">Edit Article</h1>
      <ArticleForm {...formProps} />
    </div>
  );
};

export default EditArticle;
