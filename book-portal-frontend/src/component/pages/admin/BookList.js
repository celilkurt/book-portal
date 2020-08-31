import { getBooks, deleteBook } from "../../../service/BookService";
import React from 'react';
import 'antd/dist/antd.css';
import { Col, Button, Table, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom';
import HomeWithNoContent from '../HomeWithNoContent';


class BookList extends React.Component {
  state = {
    books: [],
    isLoading: true,
    error: null,
    searchText: '',
    searchedColumn: '',
    pagination: {
      pageSize: 8
    }
  };

  componentDidMount() {
    getBooks(20,0)
      .then((response) => {
        this.setState({
          books:response.books,
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
    console.log("delete book for id: " + id);
    deleteBook(id);
    let updatedBooks = [...this.state.books].filter(i => i.id !== id);
    this.setState({books: updatedBooks});
    
  }

  async edit(id) {

    sessionStorage.setItem('bookEditId',id);
    this.props.history.push('/admin/book-edit');
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
    const { isLoading, books, error, pagination } = this.state;
    const columns = [
      {
        title: 'Book Name',
        dataIndex: 'bookName',
        key: 'bookName',
        width: '30%',
        ...this.getColumnSearchProps('bookName'),
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        width: '20%',
        ...this.getColumnSearchProps('author'),
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        ...this.getColumnSearchProps('category'),
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
      <h2>Book List</h2>
      <div >
        { 
          error ? (
            `An error occured: ${error}`
          ) : (
            <div >
          <div className="float-right">
                    <Button type="primary" success ><Link to={"/admin/book-edit"}>Add Book</Link></Button>
            </div>
            <Table 
            columns={columns} 
            dataSource={books} 
            pagination={pagination}
            loading={isLoading}
            pagination={pagination}
            rowKey={book => book.id}
            />
            </div>
          )
         }
      </div>
      
      </React.Fragment>);

    return (<HomeWithNoContent content ={content}/>);
  }

  
}


export default withRouter(BookList);