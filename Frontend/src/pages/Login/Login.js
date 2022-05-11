import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwt_decode from 'jwt-decode'
import backendServer from '../../webConfig'
import { userActionCreator } from '../../reduxutils/actions.js'
// import {companyActionCreator} from '../../reduxutils/actions.js';
import logo from '../../images/logo_signin.png'
import ErrorMsg from '../Error/ErrorMsg'
import { useTranslation } from 'react-i18next';

function Login(props) {
    const { t } = useTranslation();
    const [redirectVal, redirectValFn] = useState(null)
    const dispatch = useDispatch()
    const[errMsg,setErrMsg] = useState('');

    const setEmail = bindActionCreators(userActionCreator.setEmail,dispatch);
    const setId = bindActionCreators(userActionCreator.setId,dispatch);
    const setAccountType = bindActionCreators(userActionCreator.setAccountType,dispatch);
    const setName = bindActionCreators(userActionCreator.setName,dispatch);
    const setPhone = bindActionCreators(userActionCreator.setPhone,dispatch);
    const setResumeUrl = bindActionCreators(userActionCreator.setResumeUrl,dispatch);
    const setToken = bindActionCreators(userActionCreator.setToken,dispatch);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    // const setCompId = bindActionCreators(companyActionCreator.setCompId,dispatch);
    //const setCompanyId = bindActionCreators(userActionCreator.setCompanyId,dispatch);

  let redirectToSignUp = (e) => {
    redirectValFn(<Redirect to="/signup" />)
  }

  let signIn = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password');
    let accountType = "";
    switch(formData.get('accountType')) {
        case 'Freelancer':
            accountType = 'Freelancer';break;
        case 'Customer':
            accountType = 'Customer';break;
        default:
            setErrMsg('Please do not mess with the radio button UI.');
            showErrorModal(true);
            break;
    }
    axios.post(`${backendServer}/api/login`,{
        email:email,
        password:password,
        accountType: accountType
    }).then(res=> {   
        if(res.status!=200) {
            setErrMsg(res.data);
            showErrorModal(true);
        } else {
            // let user = res.data.userData;
            // setToken(res.data.JWT);
            // console.log(user)
            setToken(res.data);
            var decoded = jwt_decode(res.data.split(' ')[1]);
            const user = decoded.user;
            console.log(decoded);
            setEmail(user.email);
            setName(user.name);
            setAccountType(accountType);
            setId(user._id);
            if(accountType=='Customer')  {
                redirectValFn(<Redirect to="/landingPage"/>);
            } else if(accountType == 'Freelancer')  {
              redirectValFn(<Redirect to="/freelancerHome"/>);
                // if(user.companyId==null) {
                //     redirectValFn(<Redirect to="/freelancerProfile"/>);
                // }
                // else {
                //     setCompId(user.companyId);
                //     redirectValFn(<Redirect to="/freelancerHome"/>);
                // }
            } else if(accountType=='Admin')  {
                redirectValFn(<Redirect to="/adminPhotos"/>);
            }
        }
    },
    (error) => {
        setErrMsg(error.response.data);
        showErrorModal(true);
        console.log('error is',error)
    },
    )
  }
  return (
    <div
      className="container-fullwidth"
      style={{ margin: 'auto', marginTop: '5%', width: '30%' }}
    >
      {redirectVal}
      <ErrorMsg err={errMsg}></ErrorMsg>
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
      </div>
      <br></br>
      <div
        className="row"
        style={{ background: 'whitesmoke', padding: '10% 5% 5% 5%' }}
      >
        <div className="row">
          <p>
            <b>{t('Sign In')}</b>
          </p>
        </div>
        <br></br>
        <div className="row">
          <p>
            <small>
              {t('Sign In Text 1')}{' '}
              <u style={{ color: 'blue' }}>{t('Terms of Service')} </u>{t('Sign In Text 2')} <u style={{ color: 'blue' }}>{t('Sign In Text 3')} </u>{t('and')}{' '}
              <u style={{ color: 'blue' }}>{t('Sign In Text 4')}</u>.
            </small>
          </p>
        </div>
        <br></br>
        <div className="row">
          <Form onSubmit={signIn}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>{t('Email Address')}</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                maxLength="45"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>{t('Password')}</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t('Password')}
                name="password"
                maxLength="8"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label={t('Freelancer')}
                name="accountType"
                value="Freelancer"
              />
              <Form.Check
                type="radio"
                label={t('Customer')}
                name="accountType"
                value="Customer"
              />
            </Form.Group>
            
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              style={{ width: '100%' }}
              type="submit"
            >
              {t('Sign In')}
            </Button>
          </Form>
        </div>
        <div className="row" style={{ color: 'grey', textAlign: 'center' }}>
          <p>---------------{t('or')}---------------</p>
          <p style={{ color: 'navy' }} onClick={redirectToSignUp}>
            {t('Sign In Text 5')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
