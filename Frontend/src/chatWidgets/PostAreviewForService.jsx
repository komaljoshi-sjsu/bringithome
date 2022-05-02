import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import backendServer from '../webConfig';

const PostAreviewForService = (props) => {
  const { setState } = props;
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;
    axios
      .get(`http://localhost:8000/api/appliedServices/${user}`)

      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setState((state) => ({ ...state, serviceReview: res.data }));
          } else {
            const message = props.actionProvider.createChatBotMessage(
              "No  past services found"
            );
            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, message],
            }));
          }
        }
      });
  }, props.serviceReview);

  const handleService = (option) => {
    setState((state) => ({
      ...state,
      serviceDetail: option,
    }));
    props.actionProvider.addReviewHandler();
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.serviceReview.map((s) => (
            <Chip
              label={s.serviceName}
              color="primary"
              onClick={() => handleService(s)}
            />
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default PostAreviewForService;
