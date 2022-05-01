import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
const ServiceUpcomingHistory = (props) => {
  const { setState } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/appliedServices/cust1@test.com")
      .then((res) => {
        if (res.status === 200) {
          setState((state) => ({ ...state, options: res.data }));
        }
      });
  }, props.serviceUpcomingList);

  const handleService = () => {
    props.actionProvider.serviceDetailHandler();
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.serviceUpcomingList.map((s) => (
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

export default ServiceUpcomingHistory;
