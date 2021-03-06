import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import axios from 'axios';
import backendServer from '../../webConfig';
import logo from '../../images/logo_signin.png';

function Signup(props) {

    const [redirectVal, redirectValFn] = useState(null);
    let redirectToLogin = () => {
        redirectValFn(<Redirect to="/login" />);
    }

    let signUp = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullname = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const accountType = formData.get('accountType') == 'Customer' ? 'Customer' : 'Freelancer';

        axios.post(`${backendServer}/api/signup`, {
            name: fullname,
            email: email,
            password: password,
            accountType: accountType
        }).then(res => {
            if (res.status != 200) {
                alert(res.data);
            } else {
                //adding job seeker model in mongoDB after successful signup
                console.log("signup data" + res.data);
                alert('Successfully signed up');
                redirectToLogin();
            }
        }, error => {
            alert('Failed to signup. Please refer console for more details.');
            console.log(error);
        })
    }
    return (
        <div className="container-fullwidth" style={{ margin: 'auto', marginTop: '5%', width: '30%' }}>
            {redirectVal}
            <div className="row">
                <a class="navbar-brand" href="/landingPage">
                    <img
                        src={logo}
                        alt=""
                        width="150"
                        height="80"
                        style={{marginLeft:"30%"}}
                        class="d-inline-block align-text-top"
                    />
                </a>
            </div><br></br>
            <div className="row" style={{ background: 'whitesmoke', padding: '10% 5% 5% 5%' }}>
                <div className="row">
                    <h5><b>Create an account(it's free)</b></h5>
                </div><br></br>
                <div className="row">
                    <Form onSubmit={signUp}>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>Name</b></Form.Label>
                            <Form.Control type="text" placeholder="Full Name" name="name" maxLength="45" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>Email Address</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" maxLength="45" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" maxLength="8" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <p><small><b>Your Role</b></small><br></br>
                                <small style={{ color: 'gray' }}>Let us know how you'll be using our products</small></p>
                            <Form.Check type="radio" label='Freelancer' name="accountType" value="Freelancer" required /><br></br>
                            <Form.Check type="radio" label='Customer' name="accountType" value="Customer" />
                        </Form.Group>
                        <Button bsStyle="primary" bsSize="large" block style={{ width: '100%' }} type='submit'>
                            Create Account
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signup;