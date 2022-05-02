import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import backendServer from '../webConfig';

const ServiceHistory = (props) => {
  const { setState } = props;

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("persist:root"))["userInfo"];
    let user = JSON.parse(userInfo).id;
    axios
      .get(`http://localhost:8000/api/appliedServices/${user}`)
      .then((res) => {
        if (res.status === 200) {
          setState((state) => ({ ...state, serviceHistoryList: res.data }));
        }
      });
  }, props.serviceHistoryList);

  const handleService = (service) => {
    setState((state) => ({ ...state, serviceDetail: service }));

    props.actionProvider.serviceDetailHandler();
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.serviceHistoryList.map((s) => (
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

export default ServiceHistory;
