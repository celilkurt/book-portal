import React from 'react';
import { Redirect } from 'react-router-dom';
import {isAdmin} from '../service/AuthService';
import HomeWithNoContent from '../../src/component/pages/HomeWithNoContent';


export const ProtectedRoute = (props) => {
    
        const Component = props.component;
        const key  = isAdmin();
        console.log("key: " + key);

        return key ? (
             <Component />
        ) : (
           //<Redirect to={{ pathname: '/login' }} />
           <HomeWithNoContent content = {<img src={require('../img/403.png')} />}/>
        );
    
}



