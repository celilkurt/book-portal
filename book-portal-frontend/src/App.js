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
import {isLogged} from './service/AuthService';
import Profile from './component/pages/Profile';
import SearchBookPage from './component/pages/SearchBookPage';
import SearchUserPage from './component/pages/SearchUserPage';

class App extends Component {

  state = {
    isLogged:false
  }

  componentDidMount(){

    const key =  isLogged();
    this.setState({isLogged:key},() => this.render());
  }

  render() {

    const{ isLogged } = this.state;

    return (
      <Router>
        <Switch>
          <Route path='/'  exact={true} component={UserHome}/>
          <Route path='/login'  exact={true} component={Login}/>
          <Route path='/register'  exact={true} component={Register}/>
          <Route path='/book-search/:key' exact={true} component={SearchBookPage}/>
          <Route path='/user-search/:key' exact={true} component={SearchUserPage}/>

            <Route path='/profile'  exact={true} component={Profile}/>
          <ProtectedRoute path='/admin'  exact={true} component={AdminHome}/>
          <ProtectedRoute path='/admin/user-edit' exact={true}  component={UserEdit}/>
          <ProtectedRoute path='/admin/user-list'  exact={true} component={UserList}/>
          <ProtectedRoute path='/admin/book-edit' exact={true}  component={BookEdit}/>
          <ProtectedRoute path='/admin/book-list'  exact={true} component={BookList}/>
          




        </Switch>
      </Router>
    )
  }
}

export default App;
