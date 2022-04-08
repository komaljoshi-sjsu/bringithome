import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Freelancer from './pages/Freelancer/Freelancer'
import PostService from './pages/Freelancer/PostService'
import JobSeekerLandingPage from './pages/Customer/JobSeeker.js'
import CompanyTabs from './pages/Company/CompanyTabs.js'
import JoinUs from './pages/Company/JoinUs'
import Snapshot from './pages/Company/Snapshot'
import UploadPhotos from './pages/Customer/UploadPhotos.js'
import FreelancerProfile from './pages/Freelancer/FreelancerProfile'
import FreelancerUpdateProfile from './pages/Freelancer/FreelancerUpdateProfile'
import Reviews from './pages/Customer/Reviews'
import AddSalaryReview from './pages/Company/AddSalaryReview'
import FindSalaries from './pages/Customer/FindSalaries'
import FreelancerAnalytics from './pages/Freelancer/FreelancerAnalytics'
import Preferences from './pages/Customer/Preferences.js'
import CompanyJobs from './pages/Company/Jobs.js'
import Header from './common/Header'
import FeaturedReview from './pages/Freelancer/featuredReview'
import CompanyReviews from './pages/Customer/companyReviews'
import FindSalByTitle from './pages/Customer/FindSalByTitle'
import MyServices from './pages/Customer/MyServices.js'
import AppliedServices from './pages/Customer/AppliedServices.js'
import SavedServices from './pages/Customer/SavedServices.js'


//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={JobSeekerLandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/header" component={Header} />
        <Route path="/snapshot" component={Snapshot} />
        <Route path="/whyJoinUs" component={JoinUs} />
        <Route path="/signup" component={Signup} />
        <Route path="/postService" component={PostService} />
        <Route path="/freelancerHome" component={Freelancer} />
        <Route path="/freelancerProfile" component={FreelancerProfile} />
        <Route
          path="/freelancerUpdateProfile"
          component={FreelancerUpdateProfile}
        />
        <Route path="/landingPage" component={JobSeekerLandingPage} />
        <Route path="/company" component={CompanyTabs} />
        <Route path="/photos" component={UploadPhotos} />
        <Route path="/jobs" component={CompanyJobs} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/featuredReviews" component={FeaturedReview} />
        <Route path="/addSalaryReview" component={AddSalaryReview} />
        <Route path="/findSalaries" component={FindSalaries} />
        <Route path="/freelancerAnalytics" component={FreelancerAnalytics} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/allReviews" component={CompanyReviews} />
        <Route path="/myservices" component={MyServices} />
        <Route path="/savedservices" component={SavedServices} />
        <Route path="/appliedservices" component={AppliedServices} />
        {/* <Route path="/findSalByTitle/:id" component={FindSalByTitle} /> */}
        <Route path="/findSalByTitle/:jobTitle" component={FindSalByTitle} />
      </div>
    )
  }
}
//Export The Main Component
export default Main
