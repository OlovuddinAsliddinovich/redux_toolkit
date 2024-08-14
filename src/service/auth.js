import axios from "./api";

export const ApiService = {
  userRegister: async (user) => {
    const response = await axios.post("/users", { user });
    return response.data;
  },

  userLogin: async (user) => {
    const { data } = await axios.post("/users/login", { user });
    return data;
  },

  getUser: async () => {
    const { data } = await axios.get("/user");
    return data;
  },
};
