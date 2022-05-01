import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
const PostAreviewForService = (props) => {
  const { setState } = props;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/appliedServices/cust1@test.com")
      .then((res) => {
        if (res.status === 200) {
          setState((state) => ({ ...state, options: res.data }));
        }
      });
  }, props.serviceHistoryList);

  const handleService = (option) => {
    setState((state) => ({
      ...state,
      serviceDetail: props.serviceHistoryList.filter(
        (o) => o.name === option.taret.name
      ),
    }));
    props.actionProvider.addReviewHandler();
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.serviceHistoryList.map((s) => (
            <Chip
              label={s}
              color="primary"
              onClick={(option) => handleService(option)}
            />
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default PostAreviewForService;
