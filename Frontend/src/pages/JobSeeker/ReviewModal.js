import { React, Component } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import RangeSlider from 'react-bootstrap-range-slider';
import PropTypes from 'prop-types';
import backendServer from '../../webConfig';
import { Redirect } from 'react-router';

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        errors: [],
        rating: 0,
        workHappinessScore: 0,
        learningScore: 0,
        appreciationScore: 0,
        reviewTitle: '',
        reviewComments: '',
        pros: '',
        cons: '',
        ceoApprovalRating: 0,
        howToPrepare: '',
        reviewerRole: '',
        city: '',
        state: '',
        openModal: false,
        redirectFlag: false,
    };
  }

  findFormErrors = () => {
    const { reviewTitle, reviewComments, errors } = this.state;
    if (!reviewTitle || reviewTitle === '') errors.reviewTitle = 'Review title cannot be blank!';
    if (!reviewComments || reviewComments === '') errors.reviewComments = 'Review cannot be blank!';
   
    return errors;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setState({
      errors: {},
    });
  }

  onStarClick = (rating) => {
      this.setState({rating: rating});
  }

  onStarClickCEORating = (rating) => {
    this.setState({ceoApprovalRating: rating});
  }
  
  onLearningScoreChange = (e) => {
    this.setState({learningScore: e.target.value});
  }

  onWorkHappinessScoreChange = (e) => {
    this.setState({workHappinessScore: e.target.value});
  }

  onAppreciationScoreChange = (e) => {
    this.setState({appreciationScore: e.target.value});
  }

  closeModal = () => {
    this.setState({ openModal: false });
    this.setState({redirectFlag: true});
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
    this.setState({
        errors: newErrors,
    });
    } else {
        // To-DO : Get logged in company id
        const companyId = this.props.companyId;
        const jobSeekerId = this.props.jobSeekerId;
        const { rating, reviewTitle, workHappinessScore, learningScore, appreciationScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, reviewerRole, city, state } = this.state;
        const inputData = {
            companyId,
            jobSeekerId,
            rating,
            workHappinessScore,
            learningScore,
            appreciationScore,
            reviewTitle,
            reviewComments,
            reviewerRole,
            city,
            state,
            pros,
            cons,
            ceoApprovalRating,
            howToPrepare,
            postedDate : Date().toLocaleString(),

        };
        console.log(inputData);
        axios
        .post(`${backendServer}/saveReview`, inputData)
        .then((response) => {

          if (response.status === 200) {
            
            this.setState({
              successMsg: response.data,
              rating: 0,
              workHappinessScore: 0,
              learningScore: 0,
              appreciationScore: 0,
              reviewTitle: '',
              reviewComments: '',
              pros: '',
              cons: '',
              ceoApprovalRating: 0,
              howToPrepare: '',
              reviewerRole: '',
              city: '',
              state: '',
              openModal: true,
            });
          } else {
            this.setState({ errorMsg: response.data });
          }
        })
        .catch((err) => {
          this.setState({ errorMsg: "Internal Server Error!" });
        });

    }
}

  render() {
    const { addReview, closeModal} = this.props;
    const { openModal, redirectFlag, errors, rating, workHappinessScore, appreciationScore, learningScore, reviewTitle, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, reviewerRole, city, state } = this.state;
    let redirectVar = null;
    if (redirectFlag) {
      redirectVar = <Redirect to={{pathname: "/reviews", flag:true}} />;
    }
    return (
      <>
      {redirectVar}
        <Modal show={addReview} onHide={closeModal} style={{width: '90vw'}}>
          <Modal.Header closeButton>
            <Modal.Title>Enter review details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
              <Col><b>Overall rating</b></Col>
              <Col>
                <Form.Group className="mb-3">
                <ReactStars
                      count={5}
                      size={25}
                      value={rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      onChange={this.onStarClick}
                      isRequired={true}
                    />
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Work Happiness Score</b></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={workHappinessScore}
                    min={0}
                    max={100}
                    onChange={this.onWorkHappinessScoreChange}
                  />
                  </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Learning Score</b></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={learningScore}
                    min={0}
                    max={100}
                    onChange={this.onLearningScoreChange}
                  />
                  </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Appreciation Score</b></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={appreciationScore}
                    min={0}
                    max={100}
                    onChange={this.onAppreciationScoreChange}
                  />
                  </Form.Group>
              </Col>
              </Row>
              <Row>
                <Col><b>CEO Approval rating</b></Col>
                    <Col>
                    <Form.Group className="mb-3">
                    <ReactStars
                      count={5}
                      size={25}
                      value={ceoApprovalRating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      onChange={this.onStarClickCEORating}
                    />
                </Form.Group>
                    </Col>
                    </Row>
              <Row>
              <Col><b>Review Title</b></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="reviewTitle" type="text" placeholder="Enter Review Summary"
                  className="mr-sm-2" onChange={this.handleChange} value={reviewTitle} isInvalid={!!errors.reviewTitle} />
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewTitle }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Your job role</b></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="reviewerRole" type="text" placeholder="Enter your role"
                  className="mr-sm-2" onChange={this.handleChange} value={reviewerRole} isInvalid={!!errors.reviewerRole} />
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewerRole }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>City</b></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="city" type="text" placeholder="Enter your city"
                  className="mr-sm-2" onChange={this.handleChange} value={city} isInvalid={!!errors.city} />
                  <Form.Control.Feedback type="invalid">
                    { errors.city }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>State</b></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="state" type="text" placeholder="Enter your city"
                  className="mr-sm-2" onChange={this.handleChange} value={state} isInvalid={!!errors.state} />
                  <Form.Control.Feedback type="invalid">
                    { errors.state }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
                <Col><b>Your Review</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="reviewComments" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={reviewComments} isInvalid={!!errors.reviewComments}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewComments }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Pros</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="pros" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={pros} isInvalid={!!errors.pros}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.pros }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Cons</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="cons" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={cons} isInvalid={!!errors.cons}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.cons }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>How should I prepare for an interview at this company?</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="howToPrepare" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={howToPrepare} isInvalid={!!errors.howToPrepare}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.howToPrepare }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {openModal && (
        <Modal show={openModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Review added successfully!!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        )}
      </>
    );
  }
}

ReviewModal.propTypes = {
  addReview: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default ReviewModal;
