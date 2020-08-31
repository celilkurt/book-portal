import React,{ Component } from 'react';
import { addUser, updateUser, getUserById } from "../../../service/UserService";
import { getFavoriteBooksByUserId,getReadBooksByUserId } from "../../../service/BookService";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';
import HomeWithNoContent from '../HomeWithNoContent';
import FavAndReadList from '../../list/FavAndReadList';
import { withRouter} from 'react-router-dom';

 class BookEdit extends Component {

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
        if(sessionStorage.getItem('userEditId') !== null) {
            getUserById(sessionStorage.getItem('userEditId')).then((user) => {
              console.log(user);
              this.setState({user:user});
              console.log(this.state.user);

            });

              const favoriteBooks = await getFavoriteBooksByUserId(sessionStorage.getItem('userEditId')).then((resp) => {
                  return resp.books;
              });
              const readListBooks =  await getReadBooksByUserId(sessionStorage.getItem('userEditId')).then((resp) => {
                  return resp.books;
                });
              const FavoriteBooksTable = (<FavAndReadList books={favoriteBooks} 
                              title="Favorite Book List" userId={sessionStorage.getItem('userEditId')}/>);
              const ReadBooksTable = (<FavAndReadList books={readListBooks} 
                                    title="Read Book List" userId={sessionStorage.getItem('userEditId')}/>);
              this.setState({
                FavoriteBooksTable,
                ReadBooksTable
              });
            sessionStorage.removeItem('userEditId');
        }
    }
    
    async handleSubmit(event) {
        
        const {user} = this.state;
        
        if(user.id){
            //State'ın düzenlenmesi gereksiz.
            addUser(user).then(user => {this.setState({user});});

        }else{
            //State'ın düzenlenmesi gereksiz.
            updateUser(user).then(user => {this.setState({user});});
        }

        this.props.history.push('/admin/user-list');
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
        const title = <h2>{user.id ? 'Edit User': 'Add User'}</h2>;
        
        

        
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


export default withRouter(BookEdit);