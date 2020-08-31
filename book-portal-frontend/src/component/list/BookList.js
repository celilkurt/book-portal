import React from 'react';
import 'antd/dist/antd.css';
import { Button, Table} from 'antd';
import { addFavoriteBook, addReadBook } from '../../service/BookService';
import { isAdmin } from '../../service/AuthService';




export const BookList = (props) => {
  

  const pagination= {
    pageSize: 5
  };

  const { isLoading, books,edit,remove } = props;


    const columns = [
      {
        title: 'Book Name',
        dataIndex: 'bookName',
        key: 'bookName',
        width: '30%',
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        width: '20%',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title:'Action',
        dataIndex: 'id',
        key: 'id',
        render: (id) =><div> {isAdmin() ? (
        <div> 
          <Button type="primary" danger href="javascript:;"  onClick={() => remove(id)}>Delete</Button>
          <Button type="primary"  href="javascript:;"  onClick={() => edit(id)}>Edit</Button> 
        </div>):(
        <div>
          <Button type="primary" danger href="javascript:;"  onClick={() => addFavoriteBook(sessionStorage.getItem('id'), id)}>Add Favorite List</Button>
          <Button type="primary"  href="javascript:;"  onClick={() => addReadBook(sessionStorage.getItem('id'),id)}>Add Read List</Button> 
          </div>
        )}</div>}
      
    ];
    

    return <React.Fragment >
      <h2>Book List</h2>
      <div >
        { 
          books.length !== 0 ?  (
            <div >
          {isAdmin() ? (<div className="float-right">
          <Button type="primary"  href="javascript:;"  onClick={() => edit(-1)}>Add Book</Button>
            </div>):""}
            <Table 
            columns={columns} 
            dataSource={books} 
            pagination={pagination}
            loading={isLoading}
            />
            </div>
          ):""
         }
      </div>
      
      </React.Fragment>;
  
}
export default BookList;