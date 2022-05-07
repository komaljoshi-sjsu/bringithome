import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import backendServer from "../webConfig";

const ServiceUpcomingHistory = (props) => {
  const { setState } = props;

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;
    axios.get(`http://localhost:8000/api/allServices/${user}`).then((res) => {
      if (res.status === 200) {
        setState((state) => ({ ...state, serviceUpcomingList: res.data }));
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
              label={s.serviceid.serviceName}
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
