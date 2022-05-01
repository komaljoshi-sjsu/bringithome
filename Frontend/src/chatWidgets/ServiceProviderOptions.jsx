import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
const ServiceProviderOptions = (props, { actionProvider }) => {
  //const [imageUrl, setImageUrl] = useState("");
  const data = [
    "Find a Service",
    "Chat with Service Provider",
    "Post a review",
    "Service History",
    "Upcoming Services",
  ];

  const { setState } = props;

  useEffect(() => {
    setState((state) => ({ ...state, options: data }));
  });

  const handleOption = (option) => {
    option.preventDefault();
    if (option.target.innerHTML === "Find a Service") {
      props.actionProvider.findServicesHandler();
    } else if (option.target.innerHTML === "Post a review") {
      props.actionProvider.postReviewHandler();
    } else if (option.target.innerHTML === "Service History") {
      props.actionProvider.serviceHistoryHandler();
    } else if (option.target.innerHTML === "Upcoming Services") {
      props.actionProvider.serviceUpcomingHandler();
    }
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.options.map((s) => (
            <Chip
              label={s}
              color="primary"
              onClick={(option) => handleOption(option)}
            />
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default ServiceProviderOptions;
