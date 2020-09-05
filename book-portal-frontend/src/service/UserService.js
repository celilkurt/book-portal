import axios from "axios";

export const getUsers = (pageSize,pageNumber) => {
      const params = "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;
      return axios.get("/api/users" + params).then((response) => {
        
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
  return axios.get("/api/users/get" ,{id:id}).then((response) => {
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
  return axios.get("/api/users/username/" + username).then((response) => {
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
  return axios.post("/api/users", user).then((response) => {
    return response.data;
  });
};

export const updateUser = (user) => {
  return axios.put("/api/users", user).then((response) => {
    return response.data;
  });
};


export const deleteUser = (id) => {
  return axios.delete("/api/users/id/" + id).then((response) => {
    return response;
  });
};