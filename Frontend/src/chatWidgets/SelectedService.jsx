import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const SelectedService = (props) => {
  const { setState } = props;
  const [service, setService] = "";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getBookedSlots/1/cust1@test.com")
      .then((res) => {
        if (res.status === 200) {
          setService(res.data);
        }
      });
  }, props.serviceDetail);

  const handleCancel = () => {
    //cancel service call
  };
  const handleChat = () => {
    //cancel service call
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image="" alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {service.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleCancel()}>
            Cancel
          </Button>
          <Button size="small" onClick={handleChat()}>
            Chat
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default SelectedService;
