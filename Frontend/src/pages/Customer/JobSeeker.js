// Job Seeker Landing Page
import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../CSS/JobSeekerLanding.css";
import TextField from "@mui/material/TextField";
import { RatingView } from "react-simple-star-rating";
import { makeStyles } from "@material-ui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import JobSeekerNavbar from "./JobSeekerNavbar";
import CustomerLoggedIn from "./CustomerLoggedIn";
import backendServer from "../../webConfig";
import ErrorMsg from "../Error/ErrorMsg";
import Booking from "./Booking";
import config from "../../chatbot/config.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "../../chatbot/MessageParser.js";
import ActionProvider from "../../chatbot/ActionProvider.js";
import { useTranslation } from "react-i18next";
//Create a Main Component
function JobSeekerLandingPage(props) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [whatVal, handleWhatVal] = useState("");
  const [whereVal, handleWhereVal] = useState("");
  const [whatSearch, handleWhatSearch] = useState([]);
  const [whereSearch, handlewhereSearch] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [findJobs, handleFindJobs] = useState({});
  const [jobType, setJobType] = useState("");
  const [jobId, setJobId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [price, setPrice] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [mode, setMode] = useState("");
  const [pageNumbers, setPageNumbers] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [redirectVal, redirectValFn] = useState(null);

  const email = useSelector((state) => state.userInfo.email);
  const accountType = useSelector((state) => state.userInfo.accountType);
  const userid = useSelector((state) => state.userInfo.id);

  let setReDirect = (price, jobId) => {
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
    setTotalReviews(job.setTotalReviews);
  };
  const handleCompanyLink = () => {};
  const handleApply = () => {};
  const handleSaveJob = (serviceId) => {
    axios
      .post(backendServer + "/api/saveService/", {
        userId: userid,
        serviceId: serviceId,
      })
      .then((res) => {
        console.log("saved job results", res);
        if (res.status == 200) {
          alert("saved");
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
    axios
      .get("http://localhost:5000/customer/home/" + currentPage + "/" + userid)
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
            setTotalReviews(job.setTotalReviews);
          }
        }
      });
  }, [currentPage]);

  const [showBooking, setShowBooking] = useState(false);
  return (
    <div className='container-full'>
      <ErrorMsg err={errMsg}></ErrorMsg>
      {redirectVal}
      {email !== "" && accountType === "Customer" ? (
        <CustomerLoggedIn t={t}/>
      ) : (
        <JobSeekerNavbar />
      )}
      <div id="Second" class="row searchNav">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-9">
            <div class="row">
              <div class="col-4">
                <div class="input-group mb-3">
                  <button
                    class="btn noLeftborder"
                    type="button"
                    id="button-addon1"
                    disabled
                  >
                    <h6 style={{ marginTop: "10px" }}>What</h6>
                  </button>
                  <Autocomplete
                    disablePortal
                    id="free-solo-demo"
                    freeSolo
                    sx={{
                      width: 180,
                      borderBottom: "none",
                      borderWidth: "0 0 0 0",
                    }}
                    value={whatVal}
                    onChange={handleWhatVal.bind(this)}
                    options={whatSearch.map((option) => option)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: 180, borderBottom: "none" }}
                        //class="whatSearch2"
                        onChange={handleWhatVal.bind(this)}
                        value={whatVal}
                      />
                    )}
                  />
                  <button
                    class="btn noRightborder"
                    type="button"
                    id="button-addon1"
                    disabled
                  >
                    <i
                      class="bi bi-search"
                      style={{ width: "32px", height: "32px" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div class="input-group mb-3">
                  <button
                    class="btn noLeftborder"
                    type="button"
                    id="button-addon1"
                    disabled
                  >
                    <h6 style={{ marginTop: "10px" }}>Where</h6>
                  </button>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    //sx={{ width: 180, borderBottom: 'none' }}
                    value={whereVal}
                    onChange={handleWhereVal}
                    options={whereSearch.map((option) => option)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: 180, borderBottom: "none" }}
                        //class="whatSearch2"
                        value={whereVal}
                        onChange={handleWhereVal}
                      />
                    )}
                  />
                  <button
                    class="btn noRightborder"
                    type="button"
                    id="button-addon1"
                    disabled
                  >
                    <i
                      class="bi bi-geo-alt"
                      style={{ width: "32px", height: "32px" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div class="col-1">
                <button
                  type="button"
                  class="btn findbtn"
                  onClick={handleFindJobs.bind(this)}
                >
                  <h5 style={{ marginTop: "4px", color: "white" }}>
                    {t('Find Services')}
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
                  <span style={{ color: "#003399" }}>{t('Service Feed')} </span>
                </h3>
              </div>
              <div class="col-4">
                <h3 class="headinghoverUnderline">{t('Recent Searches')}</h3>
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
            {t('Services based on your searches')}
            {jobs.map((job) => (
              <div
                class="card cardStyle2"
                id={job._id}
                onClick={(e) => handleCardClick(e, job)}
              >
                <div class="card-body">
                  <h4 class="card-title">{job.serviceCategory} - {job.serviceName}</h4>
                  <h6 class="card-title">{job.freelancer.name}</h6>
                  {/* <h6 class="card-title">
                    {job.city}, {job.state}, {job.zip}
                  </h6> */}
                  <h6 class="card-title">$ {job.price}</h6>
                  <br />
                  <br />
                  <p><small class="card-text">Posted On: {job.servicePostedDate}</small></p>
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
                <h6 class="card-title">{totalReviews} reviews</h6>
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
                      {t('Request Service')}
                    </h5>
                  </button>
                </div>
                <div class="btn-group" role="group" aria-label="Third group">
                  <button
                    type="button"
                    class="btn savebtn"
                    id={companyId}
                    onClick={() => handleSaveJob(jobId)}
                  >
                    <h5 style={{ marginTop: "4px", color: "white" }}>{t('Save')}</h5>
                  </button>
                </div>
                <br />
                <br />
                <hr />
                <br />
                <h5 class="card-title">Service details</h5>
                <br />
                <h6>Service Type:</h6>
                <h6>{jobType}</h6> <br />
                <h6>Price:</h6>
                <h6>${price}</h6>
                <br />
                <hr />
                <h5 class="card-title">Full Service Description</h5>
                <br />
                <br />
                <h6>Service Description:</h6>
                <br />
                <h6>What you will get:</h6>
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
    </div>
  );
}

export default JobSeekerLandingPage;
