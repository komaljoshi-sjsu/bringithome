import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import backendServer from "../webConfig";
import { Redirect } from "react-router";

const SelectedService = (props) => {
  const { setState } = props;
  const [service, setService] = "";
  const [redirectVal, redirectValFn] = useState(null);
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;

    axios.get(`${backendServer}/api/getBookedSlots/1/${user}`).then((res) => {
      if (res.status === 200) {
        setService(res.data);
      }
    });
  }, props.serviceDetail);

  const handleCancel = () => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;
    const userId = user;
    const serviceId = props.serviceDetail.serviceId;
    const data = { userid: userId, serviceid: serviceId };
    axios.post(`${backendServer}/api/cancelService/`, data).then((res) => {
      if (res.status === 200) {
        const message = props.actionProvider.createChatBotMessage(
          `Your service for ${props.serviceDetail.serviceName} cancelled successfully`
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
        props.actionProvider.helloHandler();
      }
    });
  };

  const handleChat = () => {
    return redirectValFn(<Redirect to="/messenger" />);
  };
  return (
    <>
      {redirectVal}
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.serviceDetail.serviceid.serviceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.serviceDetail.time}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button size="small" onClick={() => handleChat()}>
            Chat
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default SelectedService;
