import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArticleService } from "../service/article";
import { getArticleStart, getArticleSuccess } from "../slice/article";
import Loader from "../ui/loader";
import { useNavigate } from "react-router-dom";

const Main = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, articles } = useSelector((state) => state.article);
  const { user, loggedIn } = useSelector((state) => state.auth);
  const getArticles = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      dispatch(getArticleFailure());
      console.log(error);
    }
  };
  useEffect(() => {
    getArticles();
  }, []);

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="album py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {isLoading ? (
            <Loader />
          ) : (
            articles &&
            articles.map((article) => (
              <div className="col" key={article.id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={
                      "https://random-image-pepebigotes.vercel.app/api/random-image"
                    }
                    alt=""
                  />
                  <div
                    className={`card-body ${mode ? "bg-dark text-light" : ""}`}
                  >
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                  </div>
                  <div
                    className={`d-flex justify-content-between align-items-center card-footer ${
                      mode ? "bg-dark text-light" : ""
                    }`}
                  >
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() => navigate(`/articles/${article.slug}`)}
                      >
                        View
                      </button>
                      {loggedIn &&
                        user.username === article.author.username && (
                          <>
                            <button
                              onClick={() =>
                                navigate(`/edit-article/${article.slug}`)
                              }
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteArticle(article.slug)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                    </div>
                    <small
                      className={` ${mode ? "text-light" : ""} text-capitalize`}
                    >
                      {article?.author?.username}
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
