import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Home from "./common/Home";
import Signup from "./pages/Signup/Signup.js";
import Freelancer from "./pages/Freelancer/Freelancer";
import PostService from "./pages/Freelancer/PostService";
import JobSeekerLandingPage from "./pages/Customer/JobSeeker.js";
import FreelancerProfile from "./pages/Freelancer/FreelancerProfile";
import FreelancerUpdateProfile from "./pages/Freelancer/FreelancerUpdateProfile";
import Reviews from "./pages/Customer/Reviews";
import FindSalaries from "./pages/Customer/FindSalaries";
import FreelancerAnalytics from "./pages/Freelancer/FreelancerAnalytics";
import Preferences from "./pages/Customer/Preferences.js";
import Header from "./common/Header";
import FeaturedReview from "./pages/Freelancer/featuredReview";
import CompanyReviews from "./pages/Customer/companyReviews";
import FindSalByTitle from "./pages/Customer/FindSalByTitle";
import MyServices from "./pages/Customer/MyServices.js";
import AppliedServices from "./pages/Customer/AppliedServices.js";
import SavedServices from "./pages/Customer/SavedServices.js";
import config from "./chatbot/config.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./chatbot/MessageParser.js";
import ActionProvider from "./chatbot/ActionProvider.js";
import ProfileUpdate from "./pages/Customer/ProfileUpdate.js";
import Booking from "./pages/Customer/Booking.js";
import Messenger from "./pages/Messenger/Messenger.js";
import CompletedServices from "./pages/Customer/CompletedServices.js";
import MyReviews from "./pages/Customer/MyReviews.js";
import FreelancerRoute from './ProtectedRoute/FreelancerRoute.js';
import CustomerRoute from './ProtectedRoute/CustomerRoute';
import MessageRoute from './ProtectedRoute/MessageRoute.js';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={JobSeekerLandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/header" component={Header} />
        <Route path="/signup" component={Signup} />
        <Route path="/landingPage" component={JobSeekerLandingPage} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/findSalaries" component={FindSalaries} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/allReviews" component={CompanyReviews} />
        <Route path="/myservices" component={MyServices} />
        <Route path="/savedservices" component={SavedServices} />
        <Route path="/appliedservices" component={AppliedServices} />
        <Route path="/completedservices" component={CompletedServices} />
        <Route path="/profileupdate" component={ProfileUpdate} />
        <Route path="/profileReviews" component={MyReviews} />
        <Route path="/booking" render={(props) => <Booking {...props} />} />
        <Route path="/findSalByTitle/:jobTitle" component={FindSalByTitle} />

        {/* Message Route */}
        <Route path="/messenger" component={Messenger} />
        {/* <MessageRoute path="/messenger" component={Messenger}  email={this.props.userInfo.email}  accountType={this.props.userInfo.accountType}/> */}

        {/* Freelancer Routes */}
        {/* <Route path="/postService" component={PostService} /> */}
        <FreelancerRoute path="/postService" component={PostService} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <FreelancerRoute path="/freelancerHome" component={Freelancer} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <FreelancerRoute path="/freelancerProfile" component={FreelancerProfile} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <FreelancerRoute path="/freelancerUpdateProfile" component={FreelancerUpdateProfile} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <FreelancerRoute path="/featuredReviews" component={FeaturedReview} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <FreelancerRoute path="/freelancerAnalytics" component={FreelancerAnalytics} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
    </div>
    );
  }
}
//Export The Main Component
// export default Main;

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})

export default connect(mapStateToProps)(Main)
