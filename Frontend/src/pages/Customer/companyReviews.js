//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { Button, Row, Col, Card, Container, Form, ListGroup,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import JobSeekerNavbar from './JobSeekerNavbar'

class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        successMsg: '',
        companyName: '',
        location: '',
        searchFlag: false,
        reviewSearchDetails: [],
      };
    }
    
    componentDidMount() {
        let { reviewDetails } = this.state;
        axios.get(`${backendServer}/allReviews`)
          .then((response) => {
            this.setState({
                reviewDetails: reviewDetails.concat(response.data),
              });
          });
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      handleSubmit = () => {
        
        let { reviewSearchDetails, companyName, location } = this.state;
        reviewSearchDetails = [];
        const inputData = {
          companyName,
          location
        }
        console.log(inputData);
        axios
          .post(`${backendServer}/searchReview`, inputData)
          .then((response) => {
            if (response.status === 200) {
              this.setState({ 
                reviewSearchDetails: reviewSearchDetails.concat(response.data),
                searchFlag: true,
              });
            } else {
              this.setState({ 
                reviewSearchDetails: [],
                errorMsg: response.data });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

    render() {
      // To-DO Fetch logged in userid from store
        const { reviewDetails, companyName, location, searchFlag, reviewSearchDetails } = this.state;
        console.log(reviewSearchDetails.length);
        let searchReviewsDisplay = '';
        if(searchFlag){
          if(reviewSearchDetails[0].companyName !== '' && reviewSearchDetails[0].companyName !== undefined ){
                searchReviewsDisplay = reviewSearchDetails.map((review) => (
                <div>
                  <ListGroup style={{ width: '50rem', margin: '0.1em', border: 'none' }}>
                    <ListGroup.Item>
                    <Row>
                      <Col><img src="../../../images/user.png" alt="helo" style={{ maxHeight: '30px', maxWidth: '30px' }} /></Col>
                      <Col><Link style={{color:'#2457a7', textDecoration: 'none'}} to="/snapshot"><h5>{review.companyName}</h5></Link>
                      <Link style={{color:'black', textDecoration: 'none'}} to="/reviews">{review.companyAvgRating}</Link><AiFillStar /></Col>
                      <Col><Link style={{color:'#2457a7', textDecoration: 'none'}} to="/reviews">Reviews</Link></Col>
                      <Col>
                            <Link style={{color:'#2457a7', textDecoration: 'none'}} to="/findSalaries">Salaries</Link>
                            </Col>
                            <Col>
                            <Link style={{color:'#2457a7', textDecoration: 'none'}} to="/findSalaries">Open Jobs</Link>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ));
            }else{
              searchReviewsDisplay = <h4>No reviews available for the search!!</h4>
            }
        }
       
        const reviewsDisplay = reviewDetails.map((review) => (
          <div>
            <Card style={{ width: '20rem', margin: '0.1em', border: 'none' }}>
                <Card.Body>
                    <Row>
                <Col xs={2}><img src="../../../images/user.png" alt="helo" style={{ maxHeight: '30px', maxWidth: '30px' }} /></Col>
                <Col xs={5}>
                <Link style={{color:'black', textDecoration: 'none'}} to="/snapshot"><h5>{review.companyName}</h5></Link>
                  </Col>
                  <Col xs={4}/>
                  </Row>
                    <Row>  
                    <Col xs={5}>
                <ReactStars
                    count={5}
                    size={20}
                    value={review.companyAvgRating}
                    isHalf={true}
                    activeColor="#9d2b6b"
                    edit={false}
                  />
                  </Col>
                  <Col xs={4}>
                  <Link style={{textDecoration: 'none'}} to="/reviews"><small>{review.noOfReviews}{' '}reviews</small></Link>
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
        ));
      return (
        <div>
          <JobSeekerNavbar />
            <br></br>
            <Container style={{ width: '70rem', display:'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
            
            <Card style={{ width: '50rem', margin: '0.8em', border: 'none' }}>
            <Card.Title>
            
                 <h1>Find great places to work</h1><br />
                
                  <h4 style={{color:'#7d7d7d'}}>Get access to millions of company reviews</h4><br />
                  <Row>
                      <Col>Company Name
                      </Col>
                      <Col>Location
                      </Col>
                      <Col />
                  </Row>
                  <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="companyName" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={companyName}/>
                </Form.Group>
              </Col>
                      <Col><Form.Group className="mb-3">
                  <Form.Control name="location" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={location} />
                </Form.Group>
                      </Col>
                      <Col>
                <Button style={{backgroundColor:'#2457a7'}} type="submit" onClick={this.handleSubmit}>
                  <b>Find Companies</b>
                </Button>
              </Col>
                  </Row>
                  <br /> 
              <h3>Popular companies</h3>
            </Card.Title>
              </Card>  
              <br /> 
            
              {!searchFlag &&reviewsDisplay}
              {searchFlag && searchReviewsDisplay}
              </Container>
        </div>
      );
    }
  }
  export default Reviews;