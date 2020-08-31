import React,{ Component } from 'react';
import { addUser, updateUser, getUserById } from "../../service/UserService";
import { getFavoriteBooksByUserId,getReadBooksByUserId } from "../../service/BookService";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';
import HomeWithNoContent from './HomeWithNoContent';
import FavAndReadList from '../list/FavAndReadList';

export default class Profile extends Component {

 state = {
            user: { id: '',
                    username: '',
                    password:'',
                    active: '',
                    role: ''
                },
                FavoriteBooksTable:null,
                ReadBooksTable:null
        };
  

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        

    }

    async componentDidMount(){
        
      getUserById(sessionStorage.getItem('id')).then((user) => {
        this.setState({
          user
        });
       });
      const favoriteBooks = await getFavoriteBooksByUserId(sessionStorage.getItem('id')).then((resp) => {
        
            return resp.books;
        });
      const readListBooks =  await getReadBooksByUserId(sessionStorage.getItem('id')).then((resp) => {
          
          return resp.books;
        });

        const FavoriteBooksTable = (<FavAndReadList books={favoriteBooks} 
                        title="Favorite Book List" userId={sessionStorage.getItem('id')}/>);
        const ReadBooksTable = (<FavAndReadList books={readListBooks} 
                              title="Read Book List" userId={sessionStorage.getItem('id')}/>);

        this.setState({
          FavoriteBooksTable,
          ReadBooksTable
        });
      
    }
    
    async handleSubmit(event) {
        
        const {user} = this.state;
        updateUser(user).then(user => {this.setState({user});});
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = this.state.user;
        user[name] = value;
        this.setState({user});
    }

    

    render(){

        const {user,FavoriteBooksTable,ReadBooksTable} = this.state;
        const title = <h2>{"Welcome " + user.username}</h2>;
        
        

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
            <Form.Item label="User Name" >
              <Input name="username" value={user.username || ''}
                  onChange={this.handleChange} autoComplete="username"/>
            </Form.Item>
            <Form.Item label="Password" >
              <Input name="password" value={user.password || ''}
                  onChange={this.handleChange} autoComplete="password"/>
            </Form.Item>
            <Form.Item label="Button">
              <Button color="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
            {FavoriteBooksTable}
            {ReadBooksTable}
        </>);

        
      
        return (
          <HomeWithNoContent content={content}/>
        );
    }
    
}
