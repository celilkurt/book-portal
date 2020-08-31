
import axios from 'axios';

//Get books by any information
export const getBooksByAny = (key,pageSize,pageNumber) => {
    
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/book/search/any/" +  params).then((response) => {
      
      return {
            books:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };
  
  //Get books by Title
  export const getBooksByBookname = (key,pageSize,pageNumber) => {
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/book/search/bookname/" +  params).then((response) => {
      
      return {
            books:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };

  //Get books by Author name
  export const getBooksByAuthor = (key,pageSize,pageNumber) => {
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/book/search/author/" + params).then((response) => {
      
      return {
            books:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };

  //Get books by Book category
  export const getBooksByCategory = (key,pageSize,pageNumber) => {
    const params = key + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/book/search/category/" + params).then((response) => {
      
      return {
            books:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };