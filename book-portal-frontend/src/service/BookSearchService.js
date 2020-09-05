
import axios from 'axios';

//Get books by any information
export const getBooksBySearchKey = (book,pageSize,pageNumber) => {
    
    const params = "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return axios.get("/api/books/search" + params,{
      book
    }).then((response) => {
      
      return {
            books:  response.data.content,
            totalPages: response.data.totalPages,
            totalElements:  response.data.totalElements,
            numberOfElements: response.data.numberOfElements,
            empty:  response.data.empty
      }
    });
  };
  