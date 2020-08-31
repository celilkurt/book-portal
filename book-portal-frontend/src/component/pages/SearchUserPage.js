import React, { Component } from 'react';
import {SearchForm} from '../form/SearchForm';
import {getUsersByRole,getUsersByUsername} from '../../service/UserSearchService';
import {deleteUser} from '../../service/UserService';
import { Button} from 'antd';
import {LeftCircleFilled,RightCircleFilled} from '@ant-design/icons';
import UserList from '../list/UserList';
import HomeWithNoContent from './HomeWithNoContent';
import { withRouter} from 'react-router-dom';

 class SearchUserPage extends Component {

    state = {
        searchForm:null,
        users:[],
        isLoading:true,
        pageSize:10,
        pageNumber:0,
        totalElements:0,
        curSearchKey:'',
        searchType:'any'
    }

    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prePage = this.prePage.bind(this);
    }

    async nextPage(){
        let {pageSize,pageNumber,totalElements} = this.state;
        if(totalElements > (pageNumber+1)*pageSize ){
            this.setState(prevstate => ({ pageNumber: prevstate.pageNumber + 1}));

            const {pageNumber,curSearchKey,pageSize,searchType} = this.state;
            await this.getUsers(pageSize,pageNumber,searchType,curSearchKey);
        }
    }

    async prePage(){
        let {pageNumber} = this.state;
        if(pageNumber > 0 ){
            this.setState(prevstate => ({ pageNumber: prevstate.pageNumber - 1}));
            const {pageNumber,curSearchKey,pageSize,searchType} = this.state;
            await this.getUsers(pageSize,pageNumber,searchType,curSearchKey);
        }
    }

    async search (values) {
        this.setState({curSearchKey:values.key});
        
        const {pageSize,pageNumber,searchType} = this.state;
        
        await this.getUsers(pageSize,pageNumber,searchType,values.key);
        
    };

    async getUsers(pageSize,pageNumber,searchType,key){

        let response = null;
        switch(searchType) {
            case 'any':
              response = await getUsersByUsername(key,pageSize,pageNumber);
              break;
            case 'role':
                response = await getUsersByRole(key,pageSize,pageNumber);
              break;
            case 'username':
                response = await getUsersByUsername(key,pageSize,pageNumber);
              break;
            default:
                response = await getUsersByUsername(key,pageSize,pageNumber);
          }

            this.setState({
                users:response.users,
                totalElements:response.totalElements,
                isLoading:false
            });

            console.log(this.state.users);

        }

    

    componentDidMount(){
        const key = this.props.match.params.key;
        console.log("search key: " + key);
        
        
        let label= '';
        switch(key) {
            case 'any':
                label="Any Info";
                this.setState({searchType:'any'});
              break;
            case 'username':
                label="Username";
                this.setState({searchType:'username'});
              break;
            case 'role':
                label="Role";
                this.setState({searchType:'role'});
              break;
            default:
                label="Any Info";
                this.setState({searchType:'any'});
          }
          const searchForm = <center><SearchForm label={label} onFinish={this.search}/></center>;
          this.setState({searchForm});
    }
    
    render() {

        const remove = (id)  => {
            console.log("delete user for id: " + id);
            deleteUser(id);
            let updatedUsers = [...this.state.users].filter(i => i.id !== id);
            this.setState({users: updatedUsers});
            
          }
          
          
         const edit = (id) => {
          
            sessionStorage.setItem('userEditId',id);
            this.props.history.push('/admin/user-edit');
          }

        const { searchForm,users,isLoading } = this.state;
        const userList = <UserList users={users} isLoading = {isLoading} edit={edit} remove={remove}/>;
        return (<HomeWithNoContent content={
        <div>
                
            <br/>
            {searchForm}
            { userList }
            
            <center>
                <Button type="primary" danger shape="circle" icon={<LeftCircleFilled />} onClick={() => this.prePage()}/>
                <Button type="primary" danger shape="circle" icon={<RightCircleFilled />} onClick={() => this.nextPage()}/>
            </center>
        </div>}/>
            
        );
    }
}


export default withRouter(SearchUserPage);