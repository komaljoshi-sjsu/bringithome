import { React, Component, useState } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import RangeSlider from 'react-bootstrap-range-slider';
import PropTypes from 'prop-types';
import backendServer from '../../webConfig';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

function ReviewModal(props) {
  const userid = useSelector((state)=>state.userInfo.id);
  const[reviewTitle, setReviewTitle] = useState('');
  const[reviewComments, setReviewComments] = useState('');
  const[rating, setRating] = useState(0);
  const[errors, setErrors] = useState({reviewTitle:'',reviewComments:''});
  const findFormErrors = () => {
    let err = {};
    if (!reviewTitle || reviewTitle === '') {
       err = {
        reviewTitle: 'Review title cannot be blank!'
      }
      setErrors(err);
    } 
    if (!reviewComments || reviewComments === '') {
       err = {
        reviewComments: 'Review cannot be blank!'
      }
      setErrors(err);
    } 
   
    return err;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
    //found errors, do not process
    } else {
        const serviceid = props.serviceid;
        const inputData = {
          userid: userid,
          serviceid: props.serviceid,
          rating: rating,
          title: reviewTitle,
          review: reviewComments
        };
        console.log(inputData);
        axios
        .post(`${backendServer}/api/postReview`, inputData)
        .then((response) => {

          if (response.status == 200) {
            
            alert('Successfully saved the review');
            props.hideModal(true);
          } else {
            alert('Failed to save the review');
          }
        })
        .catch((err) => {
          alert('Internal Server error.Failed to save the review');
        });

    }
  }
  const onStarClick = (rate) => {
    setRating(rate);
  }
  const handleReviewComment = (e) => {
    setReviewComments(e.target.value);
  }

  const handleReviewTitle = (e) => {
    setReviewTitle(e.target.value);
  }
  return (
      <Modal show={props.show} onHide={()=>props.hideModal(true)} style={{width: '90vw'}}>
        <Modal.Header closeButton>
          <Modal.Title>Service Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col><b>Rate the Service</b></Col>
            <Col>
              <Form.Group className="mb-3">
              <ReactStars
                    count={5}
                    size={25}
                    value={rating}
                    isHalf={true}
                    activeColor="#9d2b6b"
                    onChange={onStarClick}
                    isRequired={true}
                  />
              </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col><b>Review Title</b></Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control name="reviewTitle" type="text" placeholder="Enter Review Summary"
                    className="mr-sm-2" onChange={handleReviewTitle} value={reviewTitle} isInvalid={!!errors.reviewTitle} />
                    <Form.Control.Feedback type="invalid">
                      { errors.reviewTitle }
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
                <Form.Control name="reviewComments" as="textarea" rows={3} className="mr-sm-2" onChange={handleReviewComment} value={reviewComments} isInvalid={!!errors.reviewComments}/>
                <Form.Control.Feedback type="invalid">
                  { errors.reviewComments }
                </Form.Control.Feedback>
              </Form.Group>
                  </Col>
                  </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
export default ReviewModal;
