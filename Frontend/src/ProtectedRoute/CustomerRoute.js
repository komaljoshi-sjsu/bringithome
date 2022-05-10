import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function CustomerRoute({email: email, accountType: accountType, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(email !== '' && accountType === 'Customer') {
                return <Component {...props}/>
            }
            else {
                return (
                    <Redirect to={{pathname: "/login", state:{from: props.location}}} />
                );
            }
        }} />
    )
}

export default CustomerRoute