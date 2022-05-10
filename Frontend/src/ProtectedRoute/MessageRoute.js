import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function MessageRoute({email: email, accountType: accountType, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(email !== '' && (accountType === 'Freelancer'||accountType === 'Customer')) {
                return <Component {...props} />
            }
            else {
                return (
                    <Redirect to={{pathname: "/login", state:{from: props.location}}} />
                );
            }
        }} />
    )
}

export default MessageRoute