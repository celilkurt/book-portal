import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserHome from './component/pages/user/Home';
import UserEdit from './component/pages/admin/UserEdit';
import UserList from './component/pages/admin/UserList';
import BookList from './component/pages/admin/BookList';
import BookEdit from './component/pages/admin/BookEdit';
import AdminHome from './component/pages/admin/Home';
import Register from './component/pages/Register';
import Login from './component/pages/Login';
import {ProtectedRoute} from '../src/security/ProtectedRoute';
import {isLogged, isAdmin, isUser} from './service/AuthService';
import Profile from './component/pages/Profile';
import SearchBookPage from './component/pages/SearchBookPage';
import SearchUserPage from './component/pages/SearchUserPage';

class App extends Component {


  render() {

    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/login'  exact={true} component={Login}/>
          <Route path='/register'  exact={true} component={Register}/>
          
          <ProtectedRoute path='/user-search/:key' checkFunc={isAdmin} exact={true} component={SearchUserPage}/>
          <ProtectedRoute path='/admin' checkFunc={isAdmin} exact={true} component={AdminHome}/>
          <ProtectedRoute path='/admin/user-edit' checkFunc={isAdmin} exact={true}  component={UserEdit}/>
          <ProtectedRoute path='/admin/user-list' checkFunc={isAdmin}  exact={true} component={UserList}/>
          <ProtectedRoute path='/admin/book-edit' checkFunc={isAdmin} exact={true}  component={BookEdit}/>
          
          <ProtectedRoute path='/home' checkFunc={isLogged} exact={true} component={UserHome}/> 
          <ProtectedRoute path='/book-search/:key' checkFunc={isLogged} exact={true} component={SearchBookPage}/>
          <ProtectedRoute path='/profile' checkFunc={isLogged} exact={true} component={Profile}/>
          <ProtectedRoute path='/admin/book-list' checkFunc={isLogged}  exact={true} component={BookList}/>
          




        </Switch>
      </Router>
    )
  }
}

export default App;
