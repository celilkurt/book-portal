import React, { Component } from 'react';
import HomeWithNoContent from './HomeWithNoContent';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';
import { login, isAdmin} from '../../service/AuthService';



export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: { 
                    username: '',
                    password:''
                }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        
        const {user} = this.state;
        login(user).then(response => {

          sessionStorage.setItem("isLogged",true);
          sessionStorage.setItem("id",response.id);
          sessionStorage.setItem("username",user.username);
          sessionStorage.setItem("role",response.role);
          console.log("Login successful");
          //Alert giriş başarılı
          if(isAdmin()){
            this.props.history.push('/admin');
          }else{
            this.props.history.push('/');
          }
        }).catch((response) => {
          sessionStorage.setItem('isLogged',false);
          //alert giriş başarısız.
        });
        
        
        ///Uyarı mesajı oluşturulmalı
        //this.props.history.push('/');
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = this.state.user;
        user[name] = value;
        this.setState({user});
    }



    render() {

        const {user} = this.state;

        const content = (<>
        <h1 style={{ textAlign: 'center' }}>Login Page</h1>
            <LoginForm user = {user}
               handleSubmit = {this.handleSubmit}
              handleChange = {this.handleChange}/>
          </>);

        return (
            <div>
                <HomeWithNoContent content={content}/>
            </div>
        )
    }
}


const LoginForm = (props) =>{

  const {handleChange, handleSubmit, user} = props;

    return <Form onFinish={handleSubmit}
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
                        onChange={handleChange} autoComplete="username"/>
                  </Form.Item>
                  <Form.Item label="Password" >
                    <Input name="password" value={user.password || ''}
                        onChange={handleChange} autoComplete="password"/>
                  </Form.Item>
                  <Form.Item label="Button">
                    <Button color="primary" htmlType="submit">Save</Button>
                  </Form.Item>
                </Form> ;
}


