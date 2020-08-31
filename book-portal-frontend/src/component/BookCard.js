import React from 'react';
import { Button, Tooltip } from 'antd';
import { HeartFilled,HeartOutlined,PlusCircleFilled,PlusCircleOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import {addFavoriteBook,addReadBook} from '../service/BookService';


export const BookCard = (props) => {
    
    const { Meta } = Card;
    const {book,isFavorite,isInReadList} = props;
    const userId = sessionStorage.getItem('id');
    console.log(userId + " " + sessionStorage.getItem('id'));
    const heartIcon = isFavorite ? <HeartFilled /> : <HeartOutlined />;
    const readIcon = isInReadList ? <PlusCircleFilled /> : <PlusCircleOutlined />;

    return <Card
    style={{ width: 250 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
        <Tooltip title="Add favorite list">
        <Button type="primary" shape="circle" icon={heartIcon} onClick={() => addFavoriteBook(sessionStorage.getItem('id'),book.id)}/>
      </Tooltip>,
      <Tooltip title="Add read list">
      <Button type="primary" shape="circle" icon={readIcon} onClick={() => addReadBook(userId,book.id)}/>
    </Tooltip>
    ]}
    >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={book.bookName}
      description={"Author: " + book.author + " Category: "+ book.category}
    />
    
    </Card>;
}

