import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Button, Row } from "react-bootstrap";
import  '../../CSS/Booking.css'
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
import CustomerLoggedIn from './CustomerLoggedIn';
import MyServices from './MyServices';

function SavedServices(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setServices] = useState([]);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        console.log('user id is ',userid);
        axios.get(backendServer+'/api/savedServices/'+userid)
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
    const unsaveService = (serviceid)=> {
        axios.post(backendServer+'/api/unSaveService', {
            userid: userid,
            serviceid: serviceid
        })
        .then(res => {
            console.log('unsaved job results',res);
            if(res.status== 200) {
                //remove service from list
                let newArr = jobs.filter(job=>{
                    if(job._id == serviceid) {
                        return false;
                    }
                    return true;
                })
                setServices(newArr);
            } else {
                setErrMsg(res.data);
                showErrorModal(true);
            }
        }).catch(err => {
            setErrMsg('Failed to cancel service. Please check console');
            showErrorModal(true);
            console.log(err);
        }); 
    }
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            {/* <CustomerLoggedIn /> */}
            <div class="container-fluid">
                <div class="row">
                    <MyServices></MyServices>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                    <Row xs={1} md={3} className="g-4">
                            {jobs.map(job=>  {
                                return(
                                    <Card style={{ width: '18rem' , marginRight:'20px' }}>
                                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                            <Card.Body>
                                                <Card.Title><h3><b>{job.serviceName}</b></h3></Card.Title>
                                                <Card.Text>
                                                    <h5><b>{job.freelancer.name}</b></h5><br></br>
                                                    <b>{job.serviceMode}</b><br></br>
                                                    <b>${job.price}</b>
                                                </Card.Text>
                                                <Button variant="primary" className='book-button'>Book Service</Button>
                                                <Button variant="primary" className='book-button' style={{marginLeft:'10px'}} onClick={()=>unsaveService(job._id)}>Remove</Button>
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

export default SavedServices;