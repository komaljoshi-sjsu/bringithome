import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import backendServer from '../webConfig';

const FindServices = (props) => {
  const { setState } = props;

  useEffect(() => {
    axios
      .get(`${backendServer}/api/appliedServices/cust1@test.com`)
      .then((res) => {
        if (res.status === 200) {
          setState((state) => ({ ...state, serviceProvidersList: res.data }));
        }
      });
  }, props.serviceProvidersList);

  const handleService = () => {
    // redirect Service Detail Page
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.serviceProvidersList.map((s) => (
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

export default FindServices;
