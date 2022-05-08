import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import JobSeekerNavbar from "./JobSeekerNavbar";
import backendServer from "../../webConfig.js";
import { Redirect } from "react-router";
import React, { useEffect } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { userActionCreator } from "../../reduxutils/actions.js";
import { bindActionCreators } from "redux";
import axios from "axios";
import ErrorMsg from "../Error/ErrorMsg";
import SuccessMsg from "../Success/SuccessMsg";
import CustomerLoggedIn from "./CustomerLoggedIn";

function ProfileUpdate(props) {
  const dispatch = useDispatch();
  const [hideSkip, setHideSkip] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [hideContactDiv, setHideContactDiv] = useState(true);

  let fullname = useSelector((state) => state.userInfo.name);
  const id = useSelector((state) => state.userInfo.id);
  const phone = useSelector((state) => state.userInfo.phone);
  const email = useSelector((state) => state.userInfo.email);
  const password = useSelector((state) => state.userInfo.password);

  const logout = bindActionCreators(userActionCreator.logout, dispatch);
  const showSuccessModal = bindActionCreators(
    userActionCreator.showSuccessModal,
    dispatch
  );
  const setEmail = bindActionCreators(userActionCreator.setEmail, dispatch);
  const showErrorModal = bindActionCreators(
    userActionCreator.showErrorModal,
    dispatch
  );
  const setName = bindActionCreators(userActionCreator.setName, dispatch);
  const setPhone = bindActionCreators(userActionCreator.setPhone, dispatch);
  const setPassword = bindActionCreators(
    userActionCreator.setPassword,
    dispatch
  );
  //const[showContactDiv, setShowContactDiv] = useState(true);

  let nameArr = fullname.split(/\s+/);
  const [fname, ...lnames] = nameArr;
  let lname = "";
  for (let ln of lnames) {
    lname += ln;
  }
  let collapseContactInfo = () => {
    setHideContactDiv(true);
  };
  let expandContactInfo = () => {
    setHideContactDiv(false);
  };
  let updateBasicInfo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const name = fname + " " + lname;
    const phoneno = formData.get("phone");
    const password = formData.get("password");

    const data = { phone: phone, name: name, password: password };
    axios
      .post(backendServer + "/api/updateJobSeekerProfile", {
        id: id,
        data: data,
      })
      .then((res) => {
        if (res.status === 200) {
          const profile = res.data;
          setName(profile.name);
          setPhone(profile.phoneno);
          setPassword(profile.password);
          showSuccessModal(true);
          setErrMsg("Successfully updated user data");
        } else {
          setErrMsg(res.data.msg);
          showErrorModal(true);
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(
          "Failed to update Profile. Please refer console for more details"
        );
        showErrorModal(true);
      });
  };

  const hiddenFileInput = React.useRef(null);

  return (
    <div>
      {redirectTo}
      <ErrorMsg err={errMsg}></ErrorMsg>
      <SuccessMsg msg={errMsg}></SuccessMsg>
      <CustomerLoggedIn></CustomerLoggedIn>
      <div
        className="container-fullwidth"
        style={{
          marginTop: "5%",
          marginRight: "auto",
          marginLeft: "auto",
          width: "50%",
        }}
      >
        <div className="row">
          <h3 style={{ color: "darkgray" }}>
            <b>Update Profile</b>
          </h3>
        </div>

        <div
          className="row"
          style={{
            border: "1px solid darkgray",
            boxShadow: "1px 1px 1px 1px darkgray",
            padding: "20px 20px 5px 20px",
          }}
        >
          <b>
            Contact Information{" "}
            <img
              src="/images/pencil.png"
              height="15px"
              width="15px"
              style={{ float: "right", cursor: "pointer" }}
              onClick={expandContactInfo}
            />
          </b>
          <p></p>
          <div hidden={hideContactDiv}>
            <p>
              <span style={{ color: "red" }}>* </span>
              <small style={{ color: "darkgray" }}>Required Fields</small>
            </p>
            <Form onSubmit={updateBasicInfo}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>First Name </b>
                  <span style={{ color: "red" }}>* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  defaultValue={fname}
                  required
                  maxLength="45"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Last Name </b>
                  <span style={{ color: "red" }}>* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  defaultValue={lname}
                  required
                  maxLength="45"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Email Address </b>
                  <img src="/images/padlock.png" height="15px" width="15px" />
                  <span style={{ color: "darkgray", fontSize: "12px" }}>
                    only provided to employers you apply or respond to.
                  </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={email}
                  required
                  maxLength="45"
                  readOnly
                  style={{ color: "grey" }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Phone Number (optional)</b>
                  <img src="/images/padlock.png" height="15px" width="15px" />
                  <span style={{ color: "darkgray", fontSize: "12px" }}>
                    only provided to employers you apply or respond to.
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  pattern="[0-9]{10}"
                  title="Please enter a 10 digit phone number"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Password </b>

                  <span style={{ color: "darkgray", fontSize: "12px" }}>
                    only provided to employers you apply or respond to.
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  defaultValue={email}
                  required
                  maxLength="45"
                  style={{ color: "grey" }}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
              &nbsp;
              <Button variant="primary" onClick={collapseContactInfo}>
                Cancel
              </Button>
            </Form>
          </div>
          <div hidden={!hideContactDiv}>
            <p>
              {email}{" "}
              <img src="/images/padlock.png" height="15px" width="15px" />
            </p>
            {phone != null && phone.length > 0 && (
              <p>
                {phone}{" "}
                <img src="/images/padlock.png" height="15px" width="15px" />
              </p>
            )}
            {(phone == null || phone.length == 0) && (
              <p>
                <small>
                  <b>Add phone number</b>
                </small>
              </p>
            )}
          </div>
          <p></p>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default ProfileUpdate;
