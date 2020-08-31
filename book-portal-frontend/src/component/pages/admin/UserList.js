import { getUsers, deleteUser, getUserById } from '../../../service/UserService';
import React from 'react';
import 'antd/dist/antd.css';
import {  Button, Table, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Link , withRouter} from 'react-router-dom';
import HomeWithNoContent from '../HomeWithNoContent';


class UserList extends React.Component {
  state = {
    users: [],
    isLoading: true,
    error: null,
    searchText: '',
    searchedColumn: '',
    pagination: {
      pageSize: 8
    }
  };

  componentDidMount() {
    const pageSize=20,pageNumber=0;
    getUsers(pageSize,pageNumber)
      .then((response) => {
        this.setState({
          users:response.users,
          isLoading: false
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  async remove(id) {
    deleteUser(id);
    let updatedUsers = [...this.state.users].filter(i => i.id !== id);
    this.setState({users: updatedUsers});
    
  }

  async edit(id) {
    
    sessionStorage.setItem('userEditId',id);
    this.props.history.push('/admin/user-edit');
    
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  //type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}
  
  
  render() {
    const { isLoading, users, error, pagination } = this.state;
    const columns = [
      {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        width: '30%',
        ...this.getColumnSearchProps('username'),
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        width: '20%',
        ...this.getColumnSearchProps('active'),
      },
      {
        title: 'role',
        dataIndex: 'role',
        key: 'role',
        ...this.getColumnSearchProps('role'),
      },
      {
        title:'Action',
        dataIndex: 'id',
        key: 'id',
        render: (id) => <div><Button type="primary" danger href="javascript:;"  onClick={() => this.remove(id)}>Delete</Button>
        <Button type="primary"  href="javascript:;"  onClick={() => this.edit(id)}>Edit</Button></div>
      }
    ];

    const content = (<React.Fragment >
      <h2>User List</h2>
      <div >
        { 
          error ? (
            `An error occured: ${error}`
          ) : (
            <div >
          <div className="float-right">
                    <Button type="primary" success ><Link to={"/admin/User-edit"}>Add User</Link></Button>
            </div>
            <Table 
            columns={columns} 
            dataSource={users} 
            pagination={pagination}
            loading={isLoading}
            pagination={pagination}
            rowKey={user => user.id}
            />
            </div>
          )
         }
      </div>
      </React.Fragment>);

    return ( <HomeWithNoContent content={content}/>);
  }

  
}


export default withRouter(UserList);


