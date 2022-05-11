import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import backendServer from "../webConfig";

const AddreviewForService = (props) => {
  const { setState } = props;
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");

  const handleCancel = () => {
    props.actionProvider.helloHandler();
  };

  const handlePost = () => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;

    const data = {
      userid: user,
      serviceid: props.serviceDetail.serviceid._id,
      rating: rating,
      review: review,
      title: title,
      postedOn: new Date(),
    };
    axios.post(`${backendServer}/api/postReview`, data).then((res) => {
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
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={1}
            placeholder="Title"
            style={{ width: 200 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Review"
            style={{ width: 200 }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
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
