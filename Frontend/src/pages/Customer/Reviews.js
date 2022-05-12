import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import {Redirect} from 'react-router';
import JobSeekerNavbar from './JobSeekerNavbar';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import backendServer from '../../webConfig';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActionCreator } from '../../reduxutils/actions.js'
import ErrorMsg from '../Error/ErrorMsg'
import {Button, Row, Col } from "react-bootstrap";
import MyServices from './MyServices';
import CustomerLoggedIn from './CustomerLoggedIn';
import { RatingView } from "react-simple-star-rating";

function AppliedServices(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setServices] = useState([]);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    // const loc = useLocation();
    // const {serviceid} = loc.state;
    useEffect(()=> {
      axios.get(`${backendServer}/api/getReviewsByServiceId/${props.location.serviceid}`)
            .then((res) => {
              if(res.status== 200) {
                setServices(res.data);
            } else {
                setErrMsg(res.data.msg);
                showErrorModal(true);
            }
                
        });
    },[]);
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            {/* <CustomerLoggedIn /> */}
            <CustomerLoggedIn></CustomerLoggedIn>
            <div class="container-fluid">
                
                <div>
                {jobs.map(job=>  {
                        return(
                          <Card style={{ width: '60rem', margin: '0.8em' }}>
                          <Card.Body>
                            <Row>
                            <Col xs={2}>
                            <Card.Title>
                              <b>{job.rating}</b><br />
                              <RatingView ratingValue={job.rating} size={18} activeColor="#9d2b6b"/>
                            </Card.Title>
                            </Col>
                            <Col xs={8}>
                            <Card.Title>
                              <b>{job.title}</b>
                            </Card.Title>
                            <Card.Text>
                              <small>{job.postedOn}</small>
                            </Card.Text>
                            <Card.Text>
                            {job.review}
                            </Card.Text>
                            </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                        )
                                
                    })}
                  
                </div>
            </div>
        </div>
    )
}

export default AppliedServices;