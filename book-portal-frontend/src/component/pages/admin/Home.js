import React, { Component } from 'react';
import HomeWithNoContent from '../HomeWithNoContent';

export default class HomeContent extends Component {
    render() {
        const content = (<h1>Admin Home Page</h1>);

        return (
            <div>
                <HomeWithNoContent content={content}/>
            </div>
        )
    }
}
