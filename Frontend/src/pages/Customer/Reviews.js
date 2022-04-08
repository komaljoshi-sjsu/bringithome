//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {
    ButtonGroup, Button, Row, Col, Card, Container,
  } from 'react-bootstrap';
import { FaLongArrowAltDown } from 'react-icons/fa';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import ReviewModal from '../JobSeeker/ReviewModal';
import Pagination from "./../JobSeeker/Pagination";
import CompanyTabs from '../Company/CompanyTabs';

class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        reviewDetailsRatingSort: [],
        reviewDetailsDateSort: [],
        reviewDetailsHelpfulSort: [],
        openModal: false,
        rateSortFlag: false,
        dateSortFlag: false,
        helpfulSortFlag: false,
        totalPosts: 0,
      };
    }
    
    componentDidMount() {
        // To-DO : Get selected company id
        
        console.log("company Info : "+this.props.company);
        console.log("User Info : "+this.props.userInfo);
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetails } = this.state;
        const currentPage = 1;
        reviewDetails = [];
        axios.get(`${backendServer}/companyReviews`, {
          params: {
            companyId,
            jobSeekerId,
          },
        })
          .then((response) => {
            this.setState({
                //reviewDetails: reviewDetails.concat(response.data),
                totalPosts: response.data.length,
              });
          });

          axios.get(`${backendServer}/companyReviewsPaginated`, {
            params: {
              companyId,
              jobSeekerId,
              currentPage,
            },
          })
            .then((response) => {
              this.setState({
                  reviewDetails: reviewDetails.concat(response.data),
                });
            });
      }

      paginate = (pageNumber) => {
        let currentPage = pageNumber;
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        const { rateSortFlag, dateSortFlag, helpfulSortFlag } = this.state;
        if(rateSortFlag){
          let { reviewDetailsRatingSort } = this.state;
          reviewDetailsRatingSort = [];
          axios.get(`${backendServer}/companyReviewsRatingSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsRatingSort: reviewDetailsRatingSort.concat(response.data),
              });
          });
        }
        else if(dateSortFlag){
          let { reviewDetailsDateSort } = this.state;
          reviewDetailsDateSort = [];
          axios.get(`${backendServer}/companyReviewsDateSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsDateSort: reviewDetailsDateSort.concat(response.data),
              });
          });
        }else if(helpfulSortFlag){
          let { reviewDetailsHelpfulSort } = this.state;
          reviewDetailsHelpfulSort = [];
          axios.get(`${backendServer}/companyReviewsHelpfulSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsHelpfulSort: reviewDetailsHelpfulSort.concat(response.data),
              });
          });
        }
        else{
          let { reviewDetails } = this.state;
          reviewDetails = [];
          axios.get(`${backendServer}/companyReviewsPaginated`, {
            params: {
              companyId,
              jobSeekerId,
              currentPage,
            },
          })
            .then((response) => {
              this.setState({
                  reviewDetails: reviewDetails.concat(response.data),
                });
            });
          }
      }

      addReview = (e) => {
        e.preventDefault();
        this.setState({ openModal: true });
      }

      closeModal = () => {
        console.log('inside close modal')
        this.setState({ openModal: false });
      }

      ratingSort = () => {
        this.setState({ rateSortFlag: true, dateSortFlag: false, helpfulSortFlag: false });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsRatingSort } = this.state;
        const currentPage = 1;
        reviewDetailsRatingSort = [];
        axios.get(`${backendServer}/companyReviewsRatingSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsRatingSort: reviewDetailsRatingSort.concat(response.data),
              });
          });
      }

      dateSort = () => {
        this.setState({ rateSortFlag: false, dateSortFlag: true, helpfulSortFlag: false });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsDateSort } = this.state;
        const currentPage = 1;
        reviewDetailsDateSort = [];
        axios.get(`${backendServer}/companyReviewsDateSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsDateSort: reviewDetailsDateSort.concat(response.data),
              });
          });
      }

      helpfulSort= () => {
        this.setState({ rateSortFlag: false, dateSortFlag: false, helpfulSortFlag: true });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsHelpfulSort } = this.state;
        const currentPage = 1;
        reviewDetailsHelpfulSort = [];
        axios.get(`${backendServer}/companyReviewsHelpfulSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsHelpfulSort: reviewDetailsHelpfulSort.concat(response.data),
              });
          });
      }

      handleSubmit = (e, reviewId, type) => {
        const { reviewDetails } = this.state;
        const index = reviewDetails.findIndex((review) => review.reviewId === reviewId);
        const reviews = [...reviewDetails];
        if(type === 'Yes'){
          const { yesReviewHelpfulCount } = reviews[index];
          reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
          this.setState({ reviewDetails: reviews });
        }else{
          const { noHelpfulCount } = reviews[index];
          reviews[index].noHelpfulCount = noHelpfulCount+1;
          this.setState({ reviewDetails: reviews });
        }
        const inputData = {
          reviewId: reviews[index].reviewId,
          yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
          noHelpfulCount: reviews[index].noHelpfulCount,
        }
        console.log(inputData);
        axios
          .post(`${backendServer}/updateHelpfulCount`, inputData)
          .then((response) => {
            if (response.status === 200) {
              this.setState({ successMsg: response.data });
            } else {
              this.setState({ errorMsg: response.data });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

    render() {
      // To-DO Fetch logged in userid from store
        console.log(this.props.location.flag);
        const jobSeekerId = this.props.userInfo.id;
        const { reviewDetails, reviewDetailsRatingSort, reviewDetailsDateSort, reviewDetailsHelpfulSort, openModal, dateSortFlag, rateSortFlag, helpfulSortFlag, totalPosts } = this.state;
        const loggedInUserReviews =  reviewDetails.filter((review) => review.jobSeekerId === jobSeekerId);
        const otherUserReviews = reviewDetails.filter((review) => review.jobSeekerId !== jobSeekerId);
        const companies = reviewDetails.map(review => review.companyName);
        const companyName = companies[0];
        console.log(reviewDetails);
        let sortedReviews =[];
        if(rateSortFlag){
          sortedReviews = reviewDetailsRatingSort;
        }
        if(dateSortFlag){
          sortedReviews = reviewDetailsDateSort;
        }
        if(helpfulSortFlag){
          sortedReviews = reviewDetailsHelpfulSort;
        }
        const sortedReviewsDisplay = sortedReviews.map((review) => (
          <div>
            <br />
            <Card style={{ width: '60rem', margin: '0.8em' }}>
              <Card.Body>
                <Row>
                <Col xs={2}>
                <Card.Title>
                  <b>{review.rating}</b>
                  <ReactStars
                    count={5}
                    size={15}
                    value={review.rating}
                    isHalf={true}
                    activeColor="#9d2b6b"
                    edit={false}
                  />
                </Card.Title>
                </Col>
                <Col xs={8}>
                <Card.Title>
                  <b>{review.reviewTitle}</b>
                </Card.Title>
                <Card.Text>
                  <small>{review.reviewerRole}{' - '}{review.city}{', '}{review.state}{' - '}{new Date(review.postedDate).toDateString()}</small>
                </Card.Text>
                <Card.Text>
                {review.reviewComments}
                </Card.Text>
                <Card.Text>
                <b>Pros</b><br />
                {review.pros}<br />
                <b>Cons</b><br />
                {review.cons}<br />
                </Card.Text>
                <Card.Text>
                  <small>Was this review helpful?</small><br />
                  <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                  <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                </Card.Text>
                </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ));
        const userReviews = loggedInUserReviews.map((review) => (
            <div>
              <br />
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.rating}</b>
                    <ReactStars
                      count={5}
                      size={15}
                      value={review.rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      edit={false}
                    />
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                    <b>{review.reviewTitle}</b>
                  </Card.Title>
                  <Card.Text>
                    <small>{review.reviewerRole}{' - '}{review.city}{', '}{review.state}{' - '}{new Date(review.postedDate).toDateString()}</small>
                  </Card.Text>
                  <Card.Text>
                  {review.reviewComments}
                  </Card.Text>
                  <Card.Text>
                  <b>Pros</b><br />
                  {review.pros}<br />
                  <b>Cons</b><br />
                  {review.cons}<br />
                  </Card.Text>
                  <Card.Text>
                    <small>Was this review helpful?</small><br />
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
          const OtherReviews = otherUserReviews.map((review) => (
            <div>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.rating}</b>
                    <ReactStars
                      count={5}
                      size={15}
                      value={review.rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      edit={false}
                    />
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                    <b>{review.reviewTitle}</b>
                  </Card.Title>
                  <Card.Text>
                    <small>{review.reviewerRole}{' - '}{review.city}{', '}{review.state}{' - '}{new Date(review.postedDate).toDateString()}</small>
                  </Card.Text>
                  <Card.Text>
                  {review.reviewComments}
                  </Card.Text>
                  <Card.Text>
                  <b>Pros</b><br />
                  {review.pros}<br />
                  <b>Cons</b><br />
                  {review.cons}<br />
                  </Card.Text>
                  <Card.Text>
                    <small>Was this review helpful?</small><br />
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
      return (
        <div>
          <CompanyTabs></CompanyTabs>
            <br></br>
            <Container style={{ display: 'flex', justifyContent: 'flex-start' }}>
            
            <Card style={{ width: '60rem', margin: '0.8em', background:'whitesmoke' }}>
            <Card.Title>
              <br />
               <Row>
                 <Col> <h4>{companyName}{' '} Reviews</h4>
                 </Col>
                 <Col>
                 <Button onClick={this.addReview} style={{backgroundColor:'white', color:'#567cbb', border: '1px solid gray'}}><b>Review this company</b></Button>
                 </Col>
                </Row>
            </Card.Title>
            <Card.Body> 
                <b>Sort By</b>{' '} 
            <ButtonGroup>
                <Button className={helpfulSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.helpfulSort}>Helpfulness<FaLongArrowAltDown /></Button>
                <Button className={rateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.ratingSort}>Rating<FaLongArrowAltDown /></Button>
                <Button className={dateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.dateSort}>Date<FaLongArrowAltDown /></Button>
            </ButtonGroup>
              </Card.Body>
              </Card>
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {(rateSortFlag || dateSortFlag || helpfulSortFlag) && sortedReviewsDisplay}
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag) && userReviews}
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag) && OtherReviews}
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Pagination postsPerPage={5} totalPosts={totalPosts} paginate={this.paginate}/>
              </Container>
              { openModal
                  ? (
                    <ReviewModal
                      companyId={this.props.company.compid}
                      jobSeekerId={this.props.userInfo.id}
                      closeModal={this.closeModal}
                      addReview={this.addReview}
                    />
                  )
                  : null}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(Reviews);