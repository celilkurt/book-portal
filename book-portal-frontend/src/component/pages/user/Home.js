import React, { Component } from 'react';
import HomeWithNoContent from '../HomeWithNoContent';
import {BookCard} from '../../BookCard';
import {getBookById,getBooks} from '../../../service/BookService';
import {getUserByUsername} from '../../../service/UserService';
import {Col, Row, Button} from 'antd';
import {LeftCircleFilled,RightCircleFilled} from '@ant-design/icons';

export default class HomeContent extends Component {

    state = {
        books:[],
        pageNumber:0,
        pageSize:8,
        totalElements:0
    }

    /////////////////////KUllanıcı id'sini elde etmeliyiz.
    componentDidMount(){
       
        this.getBooks();
    }

    getBooks(){

        const {pageSize, pageNumber} = this.state;
        getBooks(pageSize,pageNumber).then((resp) => {
            this.setState({
                books:resp.books,
                totalElements:resp.totalElements
            });
        })

    }

    nextPage(){
        const {pageSize,pageNumber,totalElements} = this.state;
        if(totalElements > (pageNumber+1)*pageSize ){
            this.setState(prevstate => ({ pageNumber: prevstate.pageNumber + 1}),() => this.getBooks());
        }
    }

    prePage(){
        const {pageNumber} = this.state;
        if(pageNumber > 0 ){
            this.setState(prevstate => ({ pageNumber: prevstate.pageNumber - 1}),() => this.getBooks());
        }
    }
      

    render() {
        const {books,pageSize} = this.state;
        
        let cols = [];
        let rows = [];
        if(books.length !== 0){

            let i ;
            for(i = 0; i < books.length; i++){
                cols.push(<Col span={6}>{<BookCard isFavorite ={true} isInReadList ={false} book={books[i]} />}</Col>);
                
            }
        }

        

        const content = (
        <div>
            <Row gutter={[32, 32]} justify="space-around">{cols}</Row>
            <center>
                <Button type="primary" danger shape="circle" icon={<LeftCircleFilled />} onClick={() => this.prePage()}/>
                <Button type="primary" danger shape="circle" icon={<RightCircleFilled />} onClick={() => this.nextPage()}/>
            </center>
        </div>);
        

        return (
            <div>
                <HomeWithNoContent content={content}/>
            </div>
        )
    }
}
