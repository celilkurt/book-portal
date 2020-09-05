import React, { Component } from 'react';
import {SearchForm} from '../form/SearchForm';
import {getBooksBySearchKey} from '../../service/BookSearchService';
import {deleteBook} from '../../service/BookService';
import { Button} from 'antd';
import {LeftCircleFilled,RightCircleFilled} from '@ant-design/icons';
import BookList from '../list/BookList';
import HomeWithNoContent from './HomeWithNoContent';
import { withRouter} from 'react-router-dom';

 class SearchBookPage extends Component {

    state = {
        searchForm:null,
        books:[],
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
            await this.getBooks(pageSize,pageNumber,searchType,curSearchKey);
        }
    }

    async prePage(){
        let {pageNumber} = this.state;
        if(pageNumber > 0 ){
            this.setState(prevstate => ({ pageNumber: prevstate.pageNumber - 1}));
            const {pageNumber,curSearchKey,pageSize,searchType} = this.state;
            await this.getBooks(pageSize,pageNumber,searchType,curSearchKey);
        }
    }

    async search (values) {
        this.setState({curSearchKey:values.key});
        
        const {pageSize,pageNumber,searchType} = this.state;
        await this.getBooks(pageSize,pageNumber,searchType,values.key);
        
    };

    async getBooks(pageSize,pageNumber,searchType,key){

        let response = null;
        let book = {
          bookName:null,
          author:null,
          category:null
        };

        switch(searchType) {
            case 'any':
              book.bookName = key;
              book.author = key;
              book.category = key;
              break;
            case 'category':
                book.category = key;
              break;
            case 'author':
              book.author = key;
              break;
            case 'bookname':
              book.bookName = key;
              break;
            default:
              book.bookName = key;
              book.author = key;
              book.category = key;
          }

          response = await getBooksBySearchKey(book,pageSize,pageNumber);

            this.setState({
                books:response.books,
                totalElements:response.totalElements,
                isLoading:false
            });

            console.log(this.state.books);

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
            case 'category':
                label="Category";
                this.setState({searchType:'category'});
              break;
            case 'author':
                label="Author";
                this.setState({searchType:'author'});
              break;
            case 'bookname':
                label="Book Name";
                this.setState({searchType:'bookname'});
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
            console.log("delete book for id: " + id);
            deleteBook(id);
            let updatedBooks = [...this.state.books].filter(i => i.id !== id);
            this.setState({books: updatedBooks});
            
          }
          
          
         const edit = (id) => {
          
            sessionStorage.setItem('bookEditId',id);
            this.props.history.push('/admin/book-edit');
          }

        const { searchForm,books,isLoading } = this.state;
        const bookList = <BookList books={books} isLoading = {isLoading} edit={edit} remove={remove}/>;
        return (<HomeWithNoContent content={
        <div>
                
            <br/>
            {searchForm}
            { bookList }
            
            <center>
                <Button type="primary" danger shape="circle" icon={<LeftCircleFilled />} onClick={() => this.prePage()}/>
                <Button type="primary" danger shape="circle" icon={<RightCircleFilled />} onClick={() => this.nextPage()}/>
            </center>
        </div>}/>
            
        );
    }
}


export default withRouter(SearchBookPage);