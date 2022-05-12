import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import Card from "react-bootstrap/Card";
import backendServer from '../../webConfig';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActionCreator } from '../../reduxutils/actions.js'
import ErrorMsg from '../Error/ErrorMsg'
import {Button, Row, Col } from "react-bootstrap";
import FreelancerNavbar from './FreelancerNavbar'

function Reviews(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setServices] = useState([]);
    const token = useSelector((state) => state.userInfo.token);

    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        axios.defaults.headers.common['authorization'] = token;
        axios.get(backendServer+'/allCompanyReviews/'+userid)
        .then(res => {
            console.log('reviews result',res);
            if(res.status== 200) {
                setServices(res.data);
            } else {
                setErrMsg(res.data.msg);
                showErrorModal(true);
            }
        }).catch(err => {
            setErrMsg('Failed to get reviews. Please check console');
            showErrorModal(true);
            console.log(err);
        }); 
    },[]);
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            {/* <CustomerLoggedIn /> */}
            <FreelancerNavbar/>
            <div class="container-fluid">
                <div class="row" style={{marginLeft:'20%',marginRight:'20%', marginTop:'40px'}}>
                    <h2><b>Customer Reviews</b></h2><br></br>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                    <Row xs={1} md={1} className="g-4">
                    {jobs.map(job=>  {
                        return(
                            <Card style={{ width: '100%', marginRight:'20px' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <Card.Title><Row>
                                            <Col>
                                            <h4><b>{job.serviceName} - {job.serviceCategory}</b></h4>
                                            </Col>
                                            <Col style={{float:"right"}}>
                                            <ReactStars
                                            count={5}
                                            size={20}
                                            value={job.rating}
                                            isHalf={true}
                                            activeColor="#9d2b6b"
                                            edit={false}
                                            />
                                            </Col>
                                            </Row>
                                            </Card.Title>
                                        <Card.Text>
                                            {/* <h5><b>{job.serviceCategory}</b></h5> */}
                                            <h5 style ={{color:"Blue"}}><b>{job.userName}</b></h5><br/>
                                            <h6><b> {job.title}</b></h6>
                                            <b> {job.review}</b><br></br>
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

export default Reviews;