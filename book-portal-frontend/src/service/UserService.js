import axios from "axios";

export const getUsers = (pageSize,pageNumber) => {
      const params = "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;
      return axios.get("/user" + params).then((response) => {
        
        return {
          users:  response.data.content,
          totalPages: response.data.totalPages,
          totalElements:  response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          empty:  response.data.empty
          }

      });
  
};

export const getUserById = (id) => {
  return axios.get("/user/id/" + id).then((response) => {
    return {
      id: response.data.id,
      username: response.data.username,
      password:'',
      active: response.data.active,
      role: response.data.roles[0].name
    };
  });
};

export const getUserByUsername = (username) => {
  return axios.get("/user/username/" + username).then((response) => {
    return {
      id: response.data.id,
      username: response.data.username,
      password:'',
      active: response.data.active,
      role: response.data.roles[0].name
    };
  });
};

export const addUser = (user) => {
  return axios.post("/user", user).then((response) => {
    return response.data;
  });
};

export const updateUser = (user) => {
  return axios.put("/user", user).then((response) => {
    return response.data;
  });
};


export const deleteUser = (id) => {
  return axios.delete("/user/id/" + id).then((response) => {
    return response;
  });
};