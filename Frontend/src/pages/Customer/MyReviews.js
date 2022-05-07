import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import JobSeekerNavbar from './JobSeekerNavbar';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import Card from "react-bootstrap/Card";
import backendServer from '../../webConfig';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActionCreator } from '../../reduxutils/actions.js'
import ErrorMsg from '../Error/ErrorMsg'
import {Button, Row } from "react-bootstrap";
import CustomerLoggedIn from './CustomerLoggedIn';

function MyReviews(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setServices] = useState([]);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        axios.get(backendServer+'/api/getReviews/'+userid)
        .then(res => {
            console.log('saved job results',res);
            if(res.status== 200) {
                setServices(res.data);
            } else {
                setErrMsg(res.data.msg);
                showErrorModal(true);
            }
        }).catch(err => {
            setErrMsg('Failed to get saved job details. Please check console');
            showErrorModal(true);
            console.log(err);
        }); 
    },[]);
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            {/* <CustomerLoggedIn /> */}
            <CustomerLoggedIn></CustomerLoggedIn>
            <div class="container-fluid">
                <div class="row" style={{marginLeft:'20%',marginRight:'20%', marginTop:'40px'}}>
                    <h2><b>My Reviews</b></h2><br></br>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                    <Row xs={1} md={1} className="g-4">
                    {jobs.map(job=>  {
                        return(
                            <Card style={{ width: '100%', marginRight:'20px' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <Card.Title><h3><b>{job.serviceName}</b></h3></Card.Title>
                                        <Card.Text>
                                            <h4><b>{job.service.serviceCategory} - {job.service.serviceName}</b></h4>
                                            <h5><b>{job.service.freelancer.name}</b></h5><br></br><br></br>
                                            
                                            <h6><b>{job.title}</b></h6><br></br>
                                            <ReactStars
                                            count={5}
                                            size={20}
                                            value={job.rating}
                                            isHalf={true}
                                            activeColor="#9d2b6b"
                                            edit={false}
                                            />
                                            <b>{job.review}</b><br></br>
                                            <b></b><br></br>
                                        </Card.Text>
                                    </Card.Body>
                            </Card>
                        )
                                
                    })}
                    </Row>
                        
                </div>
            </div>
        </div>
    )
}

export default MyReviews;