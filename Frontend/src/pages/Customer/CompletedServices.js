import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
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
import {Button, Row } from "react-bootstrap";
import MyServices from './MyServices';
import ReviewModal from './ReviewModal';

function CompletedServices(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setServices] = useState([]);
    const [serviceid,setServiceId] = useState('');
    const[hide, hideModal] = useState(true);
    const[reviewTitle, setReviewTitle] = useState('');
    const[reviewComments, setReviewComments] = useState('');
    const[rating, setRating] = useState(0);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        axios.get(backendServer+'/api/completedServices/'+userid)
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

   const setReview = (e,serviceid,review) => {
        if(review!=null) {
            setReviewTitle(review.title);
            setReviewComments(review.review);
            setRating(review.rating);
        } else {
            setReviewTitle('');
            setReviewComments('');
            setRating(0);
        }
       setServiceId(serviceid);
       hideModal(false);
   }
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            {/* <CustomerLoggedIn /> */}
            <ReviewModal show={!hide} hideModal={hideModal} serviceid={serviceid} rating={rating} title={reviewTitle} review={reviewComments}></ReviewModal>
            <div class="container-fluid">
                <div class="row">
                    <MyServices></MyServices>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                    <Row xs={1} md={3} className="g-4">
                    {jobs.map(job=>  {
                        return(
                            <Card style={{ width: '18rem', marginRight:'20px' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <Card.Title><h3><b>{job.serviceName}</b></h3></Card.Title>
                                        <Card.Text>
                                            <h4><b>Booking Id: {job.bookingid} - {job.status}</b></h4>
                                            <h5><b>{job.freelancer.name}</b></h5><br></br><br></br>
                                            <b>Date: {job.date}</b><br></br>
                                            <b>Time: {job.time}</b><br></br>
                                            <b>{job.serviceMode}</b><br></br>
                                            <b>${job.price}</b>
                                        </Card.Text>
                                        <Button variant="primary" className='book-button' onClick={(e)=>setReview(e,job._id,job.review)}>Review Service</Button>
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

export default CompletedServices;