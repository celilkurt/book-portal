
import axios from 'axios';


export const getUsersByUsername = (key,pageSize,pageNumber) => {
    
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/user/search/username/" +  params).then((response) => {
      
      return {
            users:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };
  

  export const getUsersByRole = (key,pageSize,pageNumber) => {
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/user/search/role/" +  params).then((response) => {
      
      return {
            users:  response.data
      }
    });
  };