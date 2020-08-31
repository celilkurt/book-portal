import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Home.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Divider, Button} from 'antd';
import {
  UserOutlined
} from '@ant-design/icons';
import {logout,isAdmin,isUser, isLogged} from '../../service/AuthService';
import {AdminMenu, UserMenu} from '../SideMenu';

const { Header, Content, Footer, Sider } = Layout;




 class Home extends Component {

  state = {
    isLogged:false
  }

  constructor(props){
    super(props);
    if(props.content === null){
      props.content = "hello man"; 
    }
  }

  async componentDidMount() {

    const key = await isLogged();
    this.setState({isLogged:key});

  }  

  logout() {
    this.setState({isLogged:false});
    logout();
    this.props.history.push('/login');
  }

  

    render() {

      const {isLogged} = this.state;
      
        const pathname="/";

            return (
            <Layout>
                <Layout>
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    
                    
                    {isLogged ? (
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[pathname]}>
                      <Menu.Item key="profile page" icon={<UserOutlined />}>
                            <NavLink to="/profile">
                                  <span>Profile</span>
                              </NavLink>                         
                      </Menu.Item>
                      <Menu.Item key="logout" icon={<UserOutlined />} onClick={() => this.logout()}>
                        Logout
                      </Menu.Item>
                      </Menu>
                      ):(
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[pathname]}>
                      <Menu.Item key="login page" icon={<UserOutlined />}>
                              <NavLink to="/login">
                                  <span>Login</span>
                              </NavLink>
                      </Menu.Item>
                      </Menu>)}
                    
                </Header>
            </Layout>
            <Layout>
                <Sider
                  style={{
                    overflow: 'auto',
                    height: '91%',
                    position: 'fixed',
                    left: 0,
                    bottom:0
                  }}
                >
                  <div className="logo" />
                  
                  {isAdmin() ?(
                    <AdminMenu />
                  ): isUser() ?(
                    <UserMenu/>
                  ):
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Divider plain>User</Divider>
                    <Menu.Item key="register page" icon={<UserOutlined />}>
                            <NavLink to="/register">
                                <span>Register</span>
                            </NavLink>
                    </Menu.Item>
                  </Menu>
                }
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                  <Header className="site-layout-background" style={{ padding: 0 }} />
                  <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div>{this.props.content}</div>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>Design by Me</Footer>
                </Layout>
              </Layout>
            </Layout>
        )
    }
}

export default withRouter(Home);



