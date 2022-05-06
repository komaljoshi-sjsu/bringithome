//sample employer component
import { React, Component, useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Row, Col, Card, Container, Form, ListGroup,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import JobSeekerNavbar from './JobSeekerNavbar'
import CustomerLoggedIn from './CustomerLoggedIn';
import { useSelector } from 'react-redux';

function Reviews(props) {
  const email = useSelector((state) => state.userInfo.email);
  const accountType = useSelector((state) => state.userInfo.accountType);
  const userid = useSelector((state) => state.userInfo.id);
  const[pageNumbers, setPageNumbers] = useState([]);
  const[reviewDetails, setReviewDetails] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[freelancer, setfreelancer] = useState({});
  const[serviceName, setserviceName] = useState('');
  const[serviceCategory, setserviceCategory] = useState(1);
  useEffect(()=> {
    axios.get(`${backendServer}/api/allReviews/${currentPage}`)
          .then((response) => {
            if(response.status == 200) {
              setReviewDetails(response.data.reviews);
              setfreelancer(response.data.freelancer);
              setserviceName(response.data.serviceName);
              setserviceCategory(response.data.serviceCategory);
              let totalReviews = response.data.totalReviews;
              let totalPaginationList = Math.ceil(totalReviews / 18);
              
              let arr = [];
              for(let i = 1;i<=totalPaginationList;i++) {
                arr.push(i);
              }
              setPageNumbers(arr);
            }
              
      });
  },[currentPage]);

  return (
    <div>
          {email !== "" && accountType === "Customer" ? (
            <CustomerLoggedIn />
          ) : (
            <JobSeekerNavbar />
          )}
            <br></br>
            <Container style={{ width: '70rem', display:'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
            
            <Card style={{ width: '50rem', margin: '0.8em', border: 'none' }}>
            <Card.Title>
            
                 <h1>Go Local! Find great services from freelancers on our platform</h1><br />
                
                  <h4 style={{color:'#7d7d7d'}}>Get access to millions of reviews</h4><br />
                  
                  <br /> 
              <h3>Popular Services</h3>
            </Card.Title>
              </Card>  
              <br /> 
            
              {
              reviewDetails.map((review) => (
                <div>
                  <Card style={{ width: '30rem', margin: '0.1em' }}>
                      <Card.Body>
                          <Row>
                      <Col xs={2}><img src="../../../images/user.png" alt="user_image" style={{ maxHeight: '30px', maxWidth: '30px' }} /></Col>
                      <Col xs={5}>
                      <Link style={{color:'black', textDecoration: 'none'}} to="/snapshot"><h5>{serviceCategory} - {serviceName}</h5><br></br></Link>
                      <h7><b>{freelancer.name}</b></h7>
                        </Col>
                        
                        <Col xs={4}/>
                        </Row>
                          <Row>  
                          <Col xs={5}>
                      <ReactStars
                          count={5}
                          size={20}
                          value={review.rating/review.data.length}
                          isHalf={true}
                          activeColor="#9d2b6b"
                          edit={false}
                        />
                        </Col>
                        <Col xs={4}>
                        <Link style={{textDecoration: 'none'}} to="/reviews"><small>{review.data.length}{' '}reviews</small></Link>
                        </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                            <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/findSalaries">Salaries</Link>
                            </Col>
                            <Col xs={4}>
                            <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/findSalaries">Open Jobs</Link>
                            </Col>
                        </Row>
                    </Card.Body>
                  </Card>
                </div>
              ))  
              }
              </Container>
              <div>
                <nav>
                  <ul className="pagination">
                    {pageNumbers.map((number) => (
                      <li key={number} className="page-item">
                        <a
                          onClick={() => setCurrentPage(number)}
                          className="page-link"
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
        </div>
  )
}
  export default Reviews;