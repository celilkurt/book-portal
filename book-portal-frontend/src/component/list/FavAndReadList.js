import React, { Component } from 'react'
import {deleteFavoriteBook} from '../../service/BookService';
import {Button,Table} from 'antd'; 

export default class FavAndReadList extends Component {

    state = {
        books: [],
        error: null,
        pagination: {
          pageSize: 5
        },
        title:''
      };

     constructor(props){
       super(props);
       console.log("books in favandreadlist" + this.props.books);
     }

     componentDidMount(){

      this.setState({
        books: this.props.books,
        title: this.props.title
      });

      console.log("title: " + this.state.title + "         " + this.state.books);
     }

     


    render() {
         const {books,title,pagination,remove} =this.state;
        
      
      
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
              render: (id) =><Button type="primary"  href="javascript:;" onClick={() => remove(id)} >deleteFavoriteBook</Button> ,
            } 
          ];


        return (
            <React.Fragment >
                <h2>{title}</h2>
                <div >
                  
                      <div >
                    <div className="float-right">
                      </div>
                      <Table 
                      columns={columns} 
                      dataSource={books} 
                      pagination={pagination}
                      loading={false}
                      />
                      </div>
                </div>
           </React.Fragment>
        )
    }
}

