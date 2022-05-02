import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
const AddreviewForService = (props) => {
  const { setState } = props;
  const { setService } = props.serviceDetail;

  useEffect(() => {
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
  }, props.serviceReview);

  const handleCancel = () => {
    props.actionProvider.helloHandler();
  };
  const handlePost = () => {
    //post service call
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image="" alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.service.description}
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleCancel()}>
            Cancel
          </Button>
          <Button size="small" onClick={handlePost()}>
            Post
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AddreviewForService;
