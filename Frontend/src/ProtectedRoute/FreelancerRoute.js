import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function FreelancerRoute({email: email, accountType: accountType, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(email !== '' && accountType === 'Freelancer') {
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

export default FreelancerRoute