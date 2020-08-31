import React from 'react';
import 'antd/dist/antd.css';
import { Button, Table} from 'antd';
import { isAdmin } from '../../service/AuthService';
import {Link , withRouter} from 'react-router-dom';


export const UserList = (props) => {
  

  const pagination= {
    pageSize: 5
  };

  const { isLoading, users,edit,remove } = props;


  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: '20%',
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title:'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <div><Button type="primary" danger href="javascript:;"  onClick={() => remove(id)}>Delete</Button>
      <Button type="primary"  href="javascript:;"  onClick={() => edit(id)}>Edit</Button></div>
    }
  ];
    

    return <React.Fragment >
      <h2>User List</h2>
      <div >
        { 
          users.length !== 0 ?  (
            <div >
          {isAdmin() ? (<div className="float-right">
          <Button type="primary"  href="javascript:;"  onClick={() => edit(-1)}>Add User</Button>
            </div>):""}
            <Table 
            columns={columns} 
            dataSource={users} 
            pagination={pagination}
            loading={isLoading}
            />
            </div>
          ):""
         }
      </div>
      
      </React.Fragment>;
  
}
export default withRouter(UserList);