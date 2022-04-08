import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Freelancer from './pages/Freelancer/Freelancer'
import PostService from './pages/Freelancer/PostService'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
import CompanyTabs from './pages/Company/CompanyTabs.js'
import JoinUs from './pages/Company/JoinUs'
import Snapshot from './pages/Company/Snapshot'
import UploadPhotos from './pages/JobSeeker/UploadPhotos.js'
import CompanyPhotos from './pages/JobSeeker/CompanyPhotos'
import AdminPhoto from './pages/Admin/AdminPhoto.js'
import FreelancerProfile from './pages/Freelancer/FreelancerProfile'
import FreelancerUpdateProfile from './pages/Freelancer/FreelancerUpdateProfile'
import Reviews from './pages/JobSeeker/Reviews'
import AdminReview from './pages/Admin/AdminReview.js'
import AddSalaryReview from './pages/Company/AddSalaryReview'
import Resume from './pages/JobSeeker/Resume.js'
import FindSalaries from './pages/JobSeeker/FindSalaries'
import FreelancerAnalytics from './pages/Freelancer/FreelancerAnalytics'
import Preferences from './pages/JobSeeker/Preferences.js'
import CompanyJobs from './pages/Company/Jobs.js'
import Header from './common/Header'
import FeaturedReview from './pages/Freelancer/featuredReview'
import CompanyReviews from './pages/JobSeeker/companyReviews'
import AdminCompany from './pages/Admin/AdminCompany'
import FindSalByTitle from './pages/JobSeeker/FindSalByTitle'
import AdminAnalytics from './pages/Admin/AdminAnalytics.js'


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
        <Route path="/companyPhotos" component={CompanyPhotos} />
        <Route path="/adminPhotos" component={AdminPhoto} />
        <Route path="/jobs" component={CompanyJobs} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/featuredReviews" component={FeaturedReview} />
        <Route path="/adminReviews" component={AdminReview} />
        <Route path="/addSalaryReview" component={AddSalaryReview} />
        <Route path="/resume" component={Resume} />
        <Route path="/findSalaries" component={FindSalaries} />
        <Route path="/freelancerAnalytics" component={FreelancerAnalytics} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/allReviews" component={CompanyReviews} />
        <Route path="/adminCompany" component={AdminCompany} />
        {/* <Route path="/findSalByTitle/:id" component={FindSalByTitle} /> */}
        <Route path="/findSalByTitle/:jobTitle" component={FindSalByTitle} />
        <Route path="/adminAnalytics" component={AdminAnalytics} />
      </div>
    )
  }
}
//Export The Main Component
export default Main
