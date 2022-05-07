import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import backendServer from "../webConfig";

const AddreviewForService = (props) => {
  const { setState } = props;
  const [review, setReview] = useState("");
  //const { setService } = props.serviceDetail;

  /* useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;
    const userId = user;
    const serviceId = props.serviceDetail.serviceId;
    const data = { userid: userId, serviceid: serviceId };
    axios.post(`http://localhost:8000/api/cancelService/`, data).then((res) => {
      if (res.status === 200) {
        const message = props.actionProvider.createChatBotMessage(
          `Your service for ${props.serviceDetail.serviceName} cancelled successfully`
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    });
  }, props.serviceReview);*/

  const handleCancel = () => {
    props.actionProvider.helloHandler();
  };

  const handleReview = (review) => {
    setReview(review);
  };
  const handlePost = () => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;

    const data = {
      userid: user,
      serviceid: props.serviceDetail.serviceid._id,
      rating: "5",
      review: review,
      title: review,
      postedOn: new Date(),
    };
    axios.post(`http://localhost:8000/api/postReview`, data).then((res) => {
      if (res.status === 200) {
        const message = props.actionProvider.createChatBotMessage(
          `Your review for service  ${props.serviceDetail.serviceid.serviceName} posted successfully`
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
        props.actionProvider.helloHandler();
      }
    });

    //post service call
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.serviceDetail.serviceid.serviceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.serviceDetail.time}
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }}
            value={review}
            onChange={(e) => handleReview(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button size="small" onClick={() => handlePost()}>
            Post
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AddreviewForService;
