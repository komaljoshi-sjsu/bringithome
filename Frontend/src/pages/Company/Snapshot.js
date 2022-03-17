import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import CompanyTabs from './CompanyTabs';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import './css/snapshot.css';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {companyActionCreator} from '../../reduxutils/actions.js';

function Snapshot(props) {
    const dispatch = useDispatch();
    const companyid = useSelector((state)=>state.company.compid);
    const ceo = useSelector((state)=>state.company.ceo);
    const founded = useSelector((state)=>state.company.founded);
    const industry = useSelector((state)=>state.company.industry);
    const size = useSelector((state)=>state.company.size);
    const revenue = useSelector((state)=>state.company.revenue);
    const about = useSelector((state)=>state.company.about);
    const description = useSelector((state)=>state.company.description);
    const mission = useSelector((state)=>state.company.mission);
    const whScore = useSelector((state)=>state.company.whScore);
    const lScore = useSelector((state)=>state.company.lScore);
    const apScore = useSelector((state)=>state.company.apScore);
    const noOfReviews = useSelector((state)=>state.company.noOfReviews);
    const reviews = useSelector((state)=>state.company.featuredReviews);

    const setCeo = bindActionCreators(companyActionCreator.setCeo,dispatch);
    const setFounded = bindActionCreators(companyActionCreator.setFounded,dispatch);
    const setSize = bindActionCreators(companyActionCreator.setSize,dispatch);
    const setRevenue = bindActionCreators(companyActionCreator.setRevenue,dispatch);
    const setAbout = bindActionCreators(companyActionCreator.setAbout,dispatch);
    const setDescription = bindActionCreators(companyActionCreator.setDescription,dispatch);
    const setMission = bindActionCreators(companyActionCreator.setMission,dispatch);
    const setWHScore = bindActionCreators(companyActionCreator.setWHScore,dispatch);
    const setLScore = bindActionCreators(companyActionCreator.setLScore,dispatch);
    const setApScore = bindActionCreators(companyActionCreator.setApScore,dispatch);
    const setNoOfReviews = bindActionCreators(companyActionCreator.setNoOfReviews,dispatch);
    const setCulture = bindActionCreators(companyActionCreator.setCulture,dispatch);
    const setValues = bindActionCreators(companyActionCreator.setValues,dispatch);
    const setFeaturedReviews = bindActionCreators(companyActionCreator.setFeaturedReviews,dispatch);
    const setIndustry = bindActionCreators(companyActionCreator.setIndustry,dispatch);
    useEffect(()=> {
        axios.get('http://localhost:5000/api/snapshot/'+companyid)
        .then(res => {
            console.log('snapshot',res);
            if(res.status == 200) {
                setWHScore(res.data.whScore);
                setApScore(res.data.apScore);
                setLScore(res.data.lScore);
                setCeo(res.data.ceo);
                setFounded(res.data.founded);
                setRevenue(res.data.revenue);
                setSize(res.data.size);
                setAbout(res.data.about);
                setDescription(res.data.companyDescription);
                setMission(res.data.mission);
                setNoOfReviews(res.data.noOfReviews);
                setCulture(res.data.workCulture);
                setValues(res.data.companyValues);
                setIndustry(res.data.industry);
                setAbout(res.data.about);
            } else {
                alert(res.data);
            }
        }).catch(err => {
            alert('Failed to get company details. Please check console');
            console.log(err);
        });

        axios.get('http://localhost:5000/api/featuredReviews/'+companyid)
        .then(res => {
            console.log('Featured reviews',res);
            if(res.status == 200) {
                setFeaturedReviews(res.data);
            } else {
                alert(res.data);
            }
        }).catch(err => {
            alert('Failed to get company featured reviews. Please check console.');
            console.log(err);
        });
        
    },[]);
    return (
        <div>
            <CompanyTabs></CompanyTabs>
            <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
                <div className="row">
                    <h2><b>Work Happiness</b></h2>
                    <p><small style={{color:'gray'}}>Scores based on about {noOfReviews} responses to Indeed's survey on work happiness.</small></p>
                    <div className="col">
                        <div>
                        {whScore} Work Happiness Score
                        </div><br></br>
                        <div className="infobox infobox1">
                            Do people feel happy at work most of the time?
                        </div>
                        
                    </div>
                    <div className="col">
                        <div>
                        {lScore} Learning
                        </div><br></br>
                        <div className="infobox infobox1">
                        Do people feel they often learn something at work?
                        </div>
                    </div>
                    <div className="col">
                        <div>
                        {apScore} Appreciation
                        </div><br></br>
                        <div className="infobox infobox1">
                        Do people feel they are appreciated as a person at work?
                        </div>
                    </div>
                </div><br></br><br></br>
                <div className="row">
                    <h2><b>About the Company</b></h2>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <Card.Title>CEO</Card.Title>
                                <Card.Text>
                                {ceo}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <Card.Title>Founded</Card.Title>
                                <Card.Text>
                                {founded}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <Card.Title>Company Size</Card.Title>
                                <Card.Text>
                                More than {size}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <Card.Title>Revenue</Card.Title>
                                <Card.Text>
                                {revenue}(USD)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <Card.Title>Industry</Card.Title>
                                <Card.Text>
                                {industry}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div><br></br>
                <div className="row">
                    <p><b>About Us</b></p>
                    <p>{about}</p><br></br>
                    <p><b>Description:</b><br></br>{description}</p><br></br>
                    <p><b>Mission:</b><br></br>{mission}</p>
                </div><br></br><br></br>
                <div className="row">
                    <h2><b>Featured Reviews</b></h2>
                    {reviews.map(review=> {
                        let postedDate = review.postedDate;
                        postedDate = postedDate.replace('T',' ');
                        return (
                            <div>
                                <div>
                                    <p><img src="/images/user.png" height='24px' width='24px'/><small style={{color:"gray"}}> {review.reviewerRole} in {review.city},{review.state}</small></p>
                                    <b>{review.rating} </b><img src="/images/star.png" height='19px' width='19px'/><span style={{color:"gray"}}> on {postedDate}</span>
                                    <p><b>{review.reviewTitle}</b><br></br></p>
                                    <p>{review.reviewComments}</p><br></br>
                                    <p><b>Pros:</b></p>
                                    <p>{review.pros}</p><br></br>
                                    <p><b>Cons:</b></p>
                                    <p>{review.cons}</p>

                                </div><br></br>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Snapshot;