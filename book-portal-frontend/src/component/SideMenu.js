import React from 'react';
import { Layout, Menu, Divider, Button} from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import {
    UserOutlined
  } from '@ant-design/icons';

export const AdminMenu = (props) => {
    const { SubMenu } = Menu;

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}> 
                <Menu.Item key="/admin home page" icon={<UserOutlined />}>
                        <NavLink to="/admin">
                            <span>Admin Home</span>
                        </NavLink>
                </Menu.Item>
                <Menu.Item key="user edit page" icon={<UserOutlined />}>
                        <NavLink to="/admin/user-edit">
                            <span>Create User</span>
                        </NavLink>
                </Menu.Item>
                <Menu.Item key="user list page" icon={<UserOutlined />}>
                        <NavLink to="/admin/user-list">
                            <span>User List</span>
                        </NavLink>
                </Menu.Item>
                <Menu.Item key="book edit page" icon={<UserOutlined />}>
                        <NavLink to="/admin/book-edit">
                            <span>Create Book</span>
                        </NavLink>
                </Menu.Item>
                <Menu.Item key="book list page" icon={<UserOutlined />}>
                        <NavLink to="/admin/book-list">
                            <span>Book List</span>
                        </NavLink>
                </Menu.Item>

                <SubMenu key="book search page" icon={<UserOutlined />} title="Search Book">
                    <Menu.Item key="byAny">
                    <NavLink to="/book-search/any">
                            <span>By Any Info</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byAuthor">
                    <NavLink to="/book-search/author">
                            <span>By Author</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byCategory">
                    <NavLink to="/book-search/category">
                            <span>By Category</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byBookname">
                    <NavLink to="/book-search/bookname">
                            <span>By Book Name</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>

               
                <Menu.Item key="user search page" icon={<UserOutlined />}>
                        <NavLink to="/user-search/any">
                            <span>Search User</span>
                        </NavLink>
                </Menu.Item>
            </Menu>;

}

export const UserMenu = (props) => {
    const { SubMenu } = Menu;

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="/" icon={<UserOutlined />}>
                        <NavLink to="/">
                            <span>User Home</span>
                        </NavLink>
                </Menu.Item>
                <SubMenu key="book search page" icon={<UserOutlined />} title="Search Book">
                    <Menu.Item key="byAny">
                    <NavLink to="/book-search/any">
                            <span>By Any Info</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byAuthor">
                    <NavLink to="/book-search/author">
                            <span>By Author</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byCategory">
                    <NavLink to="/book-search/category">
                            <span>By Category</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="byBookname">
                    <NavLink to="/book-search/bookname">
                            <span>By Book Name</span>
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>;
}