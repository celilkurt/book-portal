import React, { Component } from 'react';
import HomeWithNoContent from './HomeWithNoContent';
import { addUser } from "../../service/UserService";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';



export default class Register extends Component {

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
        
        addUser(user).then(user => {this.setState({user});});
        ///Uyarı mesajı oluşturulmalı
        this.props.history.push('/');
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
            <h1 style={{ textAlign: 'center' }}>Welcome</h1>
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
          </>);

        return (
            <div>
                <HomeWithNoContent content={content}/>
            </div>
        )
    }
}
