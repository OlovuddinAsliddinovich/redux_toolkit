import axios from "./api";

export const ArticleService = {
  getArticles: async () => {
    try {
      const { data } = await axios.get("/articles");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getArticleDetail: async (slug) => {
    try {
      const { data } = await axios.get(`/articles/${slug}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  PostArticle: async (article) => {
    try {
      const { data } = await axios.post("/articles", { article });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteArticle: async (slug) => {
    try {
      const { data } = await axios.delete(`/articles/${slug}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  editArticle: async (slug, article) => {
    try {
      const { data } = await axios.put(`/articles/${slug}`, article);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
