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
            if(res.data.code == '200') {
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
            <CustomerLoggedIn />
            <div class="container-fluid">
                <div class="row">
                    <MyServices></MyServices>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                        {jobs.map(job=>  {
                                    if(job!=null)
                                        job = job[0];
                                    return (
                                    <div className="row border-bottom" style={{padding:'20px 20px 20px 20px'}}>
                                        <div className="row">
                                            <h5><b>{job.serviceName}</b></h5>
                                        </div>
                                        <div className="row">
                                            {job.serviceMode}
                                        </div>
                                        <div className="row">
                                            {job.freelancer.name}
                                        </div>
                                        <div className="row">
                                            {job.serviceMode}
                                        </div>
                                    </div>)
                        })}
                </div>
            </div>
        </div>
    )
}

export default SavedServices;