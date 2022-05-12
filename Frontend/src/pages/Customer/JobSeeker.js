// Job Seeker Landing Page
import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../CSS/JobSeekerLanding.css";
import TextField from "@mui/material/TextField";
import { RatingView } from "react-simple-star-rating";
import Draggable from "react-draggable";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Minimize from "@mui/icons-material/ExpandMoreSharp";
import Maximize from "@mui/icons-material/ExpandLessSharp";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import JobSeekerNavbar from "./JobSeekerNavbar";
import CustomerLoggedIn from "./CustomerLoggedIn";
import backendServer from "../../webConfig";
import ErrorMsg from "../Error/ErrorMsg";

import { Link } from "react-router-dom";
import { userActionCreator } from "../../reduxutils/actions.js";

import Booking from "./Booking";
import { IconButton } from "@mui/material";
import config from "../../chatbot/config.js";
//import getConfig from "../../chatbot/getConfig.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "../../chatbot/MessageParser.js";
import ActionProvider from "../../chatbot/ActionProvider.js";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import SuccessMsg from "../Success/SuccessMsg";
//Create a Main Component
function JobSeekerLandingPage(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [whatVal, handleWhatVal] = useState("");
  const [whereVal, handleWhereVal] = useState("");
  const [whatSearch, handleWhatSearch] = useState([]);
  const [whereSearch, handleWhereSearch] = useState([]);
  const [whatWhereSearch, setWhatWhereSearch] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [findJobs, handleFindJobs] = useState({});
  const [jobType, setJobType] = useState("");
  const [jobId, setJobId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [openWhat, setOpenWhat] = React.useState(false);
  const [openWhere, setOpenWhere] = React.useState(false);
  const onClick = () => toggleShow(false);
  const [whatOptions, setWhatOptions] = React.useState([]);
  const [whereOptions, setWhereOptions] = React.useState([]);
  const loadingWhat = openWhat;
  const loadingWhere = openWhere;
  const [price, setPrice] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [mode, setMode] = useState("");
  const [pageNumbers, setPageNumbers] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [savedJob, setSavedJob] = useState(false);
  const [redirectVal, redirectValFn] = useState(null);
  const showSuccessModal = bindActionCreators(
    userActionCreator.showSuccessModal,
    dispatch
  );

  const [show, toggleShow] = useState(false);
  const email = useSelector((state) => state.userInfo.email);
  const accountType = useSelector((state) => state.userInfo.accountType);
  const userid = useSelector((state) => state.userInfo.id);

  const [minimizeBot, setMinimizeBot] = useState(true);
  const token = useSelector((state) => state.userInfo.token);
  let setReDirect = (price, jobId) => {
    if (email == null || email == "") {
      redirectValFn(<Redirect to="/login" />);
      return;
    }
    let toVal = {
      pathname: "/booking",
      state: {
        price: price,
        userid: userid,
        serviceid: jobId,
      },
    };
    redirectValFn(<Redirect to={toVal} />);
  };

  const handleCardClick = (e, job) => {
    setJobId(job._id);
    setJobType(job.serviceCategory);
    setMode(job.serviceMode);
    setRoleName(job.serviceName);
    setCity(job.city);
    setZip(job.zip);
    setState(job.state);
    setPrice(job.price);
    setResponsibilities(job.responsibilities);
    setTotalReviews(job.totalReviews);
    setRating(job.avgRating);
    if (job != null && job.save) {
      setSavedJob(true);
      document.getElementById("jobsavebtn").disabled = true;
    } else if (job != null && !job.save) {
      setSavedJob(false);
      document.getElementById("jobsavebtn").disabled = false;
    }
    setSavedJob(job.save);
  };
  const handleCompanyLink = () => {};
  const handleApply = () => {};
  const handleSaveJob = (serviceId) => {
    if (email == null || email == "") {
      redirectValFn(<Redirect to="/login" />);
      return;
    }
    axios
      .post(backendServer + "/api/saveService/", {
        userId: userid,
        serviceId: serviceId,
      })
      .then((res) => {
        console.log("saved job results", res);
        if (res.status == 200) {
          //alert("saved");
          setErrMsg("Successfully saved the service");
          document.getElementById("jobsavebtn").disabled = true;
          let serv = jobs.map((jb) => {
            let newJob = JSON.parse(JSON.stringify(jb));
            if (newJob._id == serviceId) {
              newJob.save = true;
            }
            return newJob;
          });
          setJobs(serv);
          setSavedJob(true);

          showSuccessModal(true);
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        alert("Failed to save job details. Please check console");
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("I am here");
    //setWhatOptions([]);
    //setWhereOptions([]);
    axios
      .get(`${backendServer}/customer/home/` + currentPage + "/" + userid)
      .then((res) => {
        console.log("Home page data:", res);
        if (res.status == 200) {
          let services = res.data.services;
          setTotalPosts(res.data.totalPosts);
          setJobs(services);
          let job;
          let pageForNow = Math.ceil(res.data.totalPosts / 5);
          const pageNumber = [];
          console.log("Page for now:", pageForNow);
          for (let i = 1; i <= pageForNow; i++) {
            pageNumber.push(i);
          }
          // createServiceData(res.data.services);
          setPageNumbers(pageNumber);
          console.log("pagenumber:", pageNumber);
          if (services.length > 0) {
            job = services[0];
            setJobId(job._id);
            setJobType(job.serviceCategory);
            setMode(job.serviceMode);
            setRoleName(job.serviceName);
            setCity(job.city);
            setZip(job.zip);
            setState(job.state);
            setPrice(job.price);
            setResponsibilities(job.responsibilities);
            setSavedJob(job.save);
            setTotalReviews(job.totalReviews);
            setRating(job.avgRating);
            if (job.save) {
              document.getElementById("jobsavebtn").disabled = true;
            } else {
              document.getElementById("jobsavebtn").disabled = false;
            }
          }
        }
      });
  }, [currentPage]);

  const getServices = () => {
    axios
      .get(`${backendServer}/customer/home/` + currentPage + "/" + userid)
      .then((res) => {
        console.log("Home page data:", res);
        if (res.status == 200) {
          let services = res.data.services;
          setTotalPosts(res.data.totalPosts);
          setJobs(services);
          let job;
          let pageForNow = Math.ceil(res.data.totalPosts / 5);
          const pageNumber = [];
          console.log("Page for now:", pageForNow);
          for (let i = 1; i <= pageForNow; i++) {
            pageNumber.push(i);
          }

          setPageNumbers(pageNumber);
          console.log("pagenumber:", pageNumber);
          if (services.length > 0) {
            job = services[0];
            setJobId(job._id);
            setJobType(job.serviceCategory);
            setMode(job.serviceMode);
            setRoleName(job.serviceName);
            setCity(job.city);
            setZip(job.zip);
            setState(job.state);
            setPrice(job.price);
            setResponsibilities(job.responsibilities);
            setSavedJob(job.save);
            setTotalReviews(job.totalReviews);
            setRating(job.avgRating);
            if (job.save) {
              document.getElementById("jobsavebtn").disabled = true;
            } else {
              document.getElementById("jobsavebtn").disabled = false;
            }
          }
        }
      });
  };
  const getWhatServices = (what) => {
    // handleWhatVal(what);
    if (what === "") {
      setWhatOptions([]);
      return;
    }
    const data = { where: `${whereVal}`, what: what };
    axios.post(`${backendServer}/api/allServicesByWhat/`, data).then((res) => {
      console.log("Home page data:", res);
      if (res.status === 200) {
        let services = res.data;
        if (services.length === 0) {
          setOpenWhere(false);
        } else {
          setWhatOptions(services);
          setOpenWhat(true);
        }
      }
    });
  };

  const handleFindServices = () => {
    if (
      (whereVal === "" || whereVal === null) &&
      (whatVal === "" || whatVal === null)
    ) {
      getServices();
    }
    const data = { where: `${whereVal}`, what: `${whatVal}` };
    axios.post(`${backendServer}/api/findServices/`, data).then((res) => {
      console.log("Home page data:", res);
      if (res.status == 200) {
        let services = res.data;
        setJobs(services);
      }
    });
  };
  const getWhereServices = (where) => {
    // handleWhereVal(where);
    if (where === "") {
      setWhereOptions([]);
    }
    const data = { where: where, what: `${whatVal}` };
    axios.post(`${backendServer}/api/allServicesByWhere/`, data).then((res) => {
      console.log("Home page data:", res);
      if (res.status == 200) {
        let services = res.data;
        if (services.length === 0) {
          setOpenWhere(false);
        } else {
          setWhereOptions(services);
        }
      }
    });
  };

  return (
    <div className="container-full">
      <ErrorMsg err={errMsg}></ErrorMsg>
      <SuccessMsg msg={errMsg}></SuccessMsg>
      {redirectVal}
      {email !== "" && accountType === "Customer" ? (
        <CustomerLoggedIn />
      ) : (
        <JobSeekerNavbar />
      )}
      <div id="Second" class="row searchNav">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-9">
            <div class="row">
              <div class="col-3">
                <div class="input-group mb-3">
                  <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 300 }}
                    open={openWhat}
                    inputValue={whatSearch}
                    onChange={(event, newValue) => {
                      handleWhatVal(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleWhatSearch(newInputValue);
                    }}
                    onOpen={() => {
                      setOpenWhat(true);
                    }}
                    onClose={() => {
                      setOpenWhat(false);
                    }}
                    getOptionSelected={(option, value) =>
                      option.serviceName === value.serviceName
                    }
                    getOptionLabel={(option) => option.serviceName}
                    onSelect={(ev) => handleWhatVal(ev.target.value)}
                    options={whatOptions.map((option) => option)}
                    filterOptions={(options, state) => options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="What"
                        value={whatVal}
                        variant="outlined"
                        onChange={(ev) => {
                          if (
                            ev.target.value !== "" ||
                            ev.target.value !== null
                          ) {
                            getWhatServices(ev.target.value);
                          }
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="input-group mb-3">
                  <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 300 }}
                    open={openWhere}
                    inputValue={whereSearch}
                    onChange={(event, newValue) => {
                      handleWhereVal(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleWhereSearch(newInputValue);
                    }}
                    onOpen={() => {
                      setOpenWhere(true);
                    }}
                    onClose={() => {
                      setOpenWhere(false);
                    }}
                    getOptionSelected={(option, value) =>
                      option.city === value.city
                    }
                    getOptionLabel={(option) => option.city}
                    options={whereOptions}
                    loading={loadingWhere}
                    filterOptions={(options, state) => options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Where"
                        variant="outlined"
                        value={whereVal}
                        onSelect={(ev) => handleWhereVal(ev.target.value)}
                        onChange={(ev) => {
                          if (
                            ev.target.value !== "" ||
                            ev.target.value !== null
                          ) {
                            getWhereServices(ev.target.value);
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingWhere ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div class="col-1">
                <button
                  type="button"
                  class="btn findbtn"
                  onClick={() => handleFindServices()}
                >
                  <h5 style={{ marginTop: "4px", color: "white" }}>
                    {t("Find Services")}
                  </h5>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row" style={{ marginTop: "10px" }}>
          <div class="col-4"></div>

          <div class="col-4"></div>
        </div>
      </div>
      <hr />
      <div id="third" class="row" style={{ marginTop: "10px" }}>
        <div class="row">
          <div class="col-4"></div>
          <div class="col-7">
            <div class="row">
              <div class="col-3">
                <h3 class="headinghoverUnderline" style={{ color: "#003399" }}>
                  <span style={{ color: "#003399" }}>{t("Service Feed")} </span>
                </h3>
              </div>
              <div class="col-4">
                <h3 class="headinghoverUnderline">{t("Recent Searches")}</h3>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div
        id="third"
        class="row "
        style={{ backgroundColor: "#f7f7f7", marginTop: "20px" }}
      >
        <div class="row">
          <div class="col-2"></div>
          <div class="col-4" style={{ marginLeft: "0px" }}>
            {/* <h4 style={{ marginTop: '10px' }}>
              {month} {day}, {year}
            </h4> */}
            {t("Services based on your searches")}
            {jobs.map((job) => (
              <div
                class="card cardStyle2"
                id={job._id}
                onClick={(e) => handleCardClick(e, job)}
              >
                <div class="card-body">
                  <h4 class="card-title">
                    {job.serviceCategory} - {job.serviceName}
                  </h4>
                  <h6 class="card-title">{job.freelancer.name}</h6>
                  {/* <h6 class="card-title">
                    {job.city}, {job.state}, {job.zip}
                  </h6> */}
                  <h6 class="card-title">$ {job.price}</h6>
                  <br />
                  <br />
                  <p>
                    <small class="card-text">
                      Posted On: {job.servicePostedDate}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div class="col-5">
            <div class="card cardStyle">
              <div class="card-body">
                <h4 class="card-title">{roleName}</h4>
                <h6
                  class="card-title companyNameCss"
                  onClick={handleCompanyLink.bind(this)}
                >
                  {companyName}
                </h6>
                <RatingView ratingValue={rating} />
                <br />
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/reviews", serviceid: jobId }}
                >
                  <h6>{totalReviews} reviews</h6>
                </Link>
                {/* <h6 class="card-title" onClick={()=>setRedirectToReview(jobId)}>{totalReviews} reviews</h6> */}
                <h6 class="card-title">
                  {city}, {state}
                </h6>
                <h6 class="card-title">{zip}</h6>
                {/* You must create an account to book the service */}
                <br />
                <br />
                <div class="btn-group" role="group" aria-label="Third group">
                  <button
                    type="button"
                    class="btn applybtn"
                    onClick={() => setReDirect(price, jobId)}
                    id={jobId}
                  >
                    <h5 style={{ marginTop: "4px", color: "white" }}>
                      {t("Request Service")}
                    </h5>
                  </button>
                </div>
                <div class="btn-group" role="group" aria-label="Third group">
                  <button
                    type="button"
                    class="btn savebtn"
                    id="jobsavebtn"
                    onClick={() => handleSaveJob(jobId)}
                  >
                    <h5 style={{ marginTop: "4px", color: "white" }}>
                      {savedJob ? t("Saved") : t("Save")}
                    </h5>
                  </button>
                </div>
                <br />
                <br />
                <hr />
                <br />
                <h5 class="card-title">{t("Service details")}</h5>
                <br />
                <h6>{t("Service Type")}:</h6>
                <h6>{jobType}</h6> <br />
                <h6>{t("Price")}:</h6>
                <h6>${price}</h6>
                <br />
                <hr />
                <h5 class="card-title">{t("Full Service Description")}</h5>
                <br />
                <br />
                <h6>{t("Service Description")}:</h6>
                <br />
                <h6>{t("What you will get")}:</h6>
                <h6>{responsibilities}</h6>
                <br />
              </div>

              <div class="col-1"></div>
            </div>
          </div>
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <a
                    onClick={() => setCurrentPage(number)}
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {minimizeBot ? (
        <Draggable>
          <div className="appChatbotContainer_3u5t">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText=""
            />
            <IconButton
              style={{ height: "50px" }}
              onClick={() => setMinimizeBot(!minimizeBot)}
              className="btn-overlay"
            >
              <Minimize />
            </IconButton>
          </div>
        </Draggable>
      ) : (
        <Draggable>
          <div className="appChatbotContainer_3u5t">
            <div className="react-chatbot-kit-chat-container">
              <div className="react-chatbot-kit-chat-header">
                Conversation with Liz
                <IconButton onClick={() => setMinimizeBot(!minimizeBot)}>
                  <Maximize />
                </IconButton>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default JobSeekerLandingPage;
