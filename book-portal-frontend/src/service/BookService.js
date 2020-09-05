import axios from "axios";

export const getBooks = (pageSize, pageNumber) => {
  const params = "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;
  return axios.get("/api/books" + params).then((response) => {
    
    return {
          books:  response.data.content,
          totalPages: response.data.totalPages,
          totalElements:  response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          empty:  response.data.empty
    }
  });
};

export const getBookById = (id) => {
    return axios.get("/api/books/id/" + id).then((response) => {
      return {
        id: response.data.id,
        bookName: response.data.bookName,
        author: response.data.author,
        category: response.data.category
      };
    });
  };

  export const getFavoriteBooksByUserId = (id) => {

    return axios.get("/api/books/favorite/id/" + id).then((response) => {
      return {

            books:response.data
      }
    });
  };

  export const getReadBooksByUserId = (id) => {
    return axios.get("/api/books/read-list/id/" + id).then((response) => {
      return {
            books:  response.data
      }
    });
  };

  export const addBook = (book) => {
    return axios.post("/api/books", book).then((response) => {
      return response.data;
    });
  };

  export const updateBook = (book) => {
    return axios.put("/api/books", book).then((response) => {
      return response.data;
    });
  };

  export const addFavoriteBook = (userId,bookId) => {

    const params = "?userId=" + userId + "&bookId=" + bookId;
    return axios.post("/api/books/favorite" + params );

  };


  export const addReadBook = (userId,bookId) => {
    const params = "?userId=" + userId + "&bookId=" + bookId;
    return axios.post("/api/books/read-list" + params);

  };

  export const deleteBook = (id) => {
    return axios.delete("/api/books/id/" + id).then((response) => {
      return response;
    });
  };

  export const deleteFavoriteBook = (userId,bookId) => {
    return axios.delete("/api/books/favorite" ,{
        params: {
            userId:userId,
            bookId:bookId
        }
    }).then((response) => {
      return response;
    });
  };

  export const deleteReadBook = (userId,bookId) => {
    return axios.delete("/api/books/read-list" ,{
        params: {
            userId:userId,
            bookId:bookId
        }
    }).then((response) => {
      return response;
    });
  };