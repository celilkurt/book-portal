import React from 'react';
import HomeWithNoContent from '../../src/component/pages/HomeWithNoContent';


export const ProtectedRoute = (props) => {
    
        const Component = props.component;
        const key  =props.checkFunc();
        console.log("key: " + key);

        if(key){
                return <Component/>;
        }else{
                return <HomeWithNoContent content = {<img src={require('../img/403.png')} />}/>;
        }
        
}



