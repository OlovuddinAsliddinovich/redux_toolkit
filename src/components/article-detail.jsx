import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { ArticleService } from "../service/article";
import Loader from "../ui/loader";
import moment from "moment";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { articleDetail, isLogin } = useSelector((state) => state.article);

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      console.log(error);
      dispatch(getArticleDetailFailure(error));
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  useEffect(() => {
    getArticleDetail();
  }, [slug]);

  return isLogin ? (
    <Loader />
  ) : (
    articleDetail !== null && (
      <div className="article-detail d-flex gap-4 align-items-center justify-content-center flex-lg-row flex-column ">
        <div className="w-100 overflow-hidden">
          <img
            src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
            style={{
              maxWidth: "100%",
              height: "400px",
              margin: "auto",
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt="img"
          />
        </div>
        <div className="w-100 ">
          <h1 className="text-center">{articleDetail.title}</h1>
          <div className="d-flex">
            <p>{articleDetail.description}</p>
          </div>
          <p>{articleDetail.body}</p>
          <div className="d-flex justify-content-between">
            <h1
              className="bg-primary text-center d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                color: "white",
              }}
            >
              {getInitial(articleDetail.author.username)}
            </h1>
            <div className="d-flex gap-4">
              <p className="text-capitalize">{articleDetail.author.username}</p>
              <p>{moment(articleDetail.createdAt).format("YYYY-MM-DD")}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;
