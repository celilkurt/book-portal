import React from 'react';
import { addBook, updateBook, getBookById } from "../../../service/BookService";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';
import { Component } from 'react';
import HomeWithNoContent from '../HomeWithNoContent';
import { withRouter} from 'react-router-dom';

 class BookEdit extends Component {

    

    constructor(props){
        super(props);
        this.state = {
            book: { id: '',
                    bookName: '',
                    author: '',
                    category: ''
                }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        if(sessionStorage.getItem('bookEditId') !== null) {
            getBookById(sessionStorage.getItem('bookEditId')).then((book) => {
                this.setState({book});
            });
          sessionStorage.removeItem('bookEditId');
        }
    }
    
    async handleSubmit(event) {
        
        const {book} = this.state;
        
        if(book.id){
            addBook(book).then(book => {this.setState({book});});

        }else{
            updateBook(book).then(book => {this.setState({book});});
        }

        this.props.history.push('/admin/book-list');
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let book = this.state.book;
        book[name] = value;
        this.setState({book});
    }

    render(){

        const {book} = this.state;
        const title = <h2>{book.id ? 'Edit Book': 'Add Book'}</h2>
        
        const content = (<>
          {title}
                  
          <Form onFinish={this.handleSubmit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Book Name" >
              <Input name="bookName" value={book.bookName || ''}
                  onChange={this.handleChange} autoComplete="bookName"/>
            </Form.Item>
            <Form.Item label="Author" >
              <Input name="author" value={book.author || ''}
                  onChange={this.handleChange} autoComplete="author"/>
            </Form.Item>
            <Form.Item label="Category" >
              <Input name="category" value={book.category || ''}
                      onChange={this.handleChange} autoComplete="category"/>
            </Form.Item>

            <Form.Item label="Button">
              <Button color="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </>);
      
        return (
            
          <HomeWithNoContent content={content}/>
          
        );
    }
    
}

export default withRouter(BookEdit);
