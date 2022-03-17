/* eslint-disable jsx-a11y/anchor-is-valid */
// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CompanyImage from '../../images/companyImage.png'
import companyLogo from '../../images/company-logo.jpeg'
import JobSeekerNavbar from '../JobSeeker/JobSeekerNavbar'
import { Link, withRouter } from 'react-router-dom'

class CompanyTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <JobSeekerNavbar />
        <div class="container-fluid">
          <img src={CompanyImage} alt="" width="100%" height="200" />
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4"></div>
            <div class="col-2">
              <img src={companyLogo} alt="" width="170" height="100" />
            </div>
            <div class="col-6">
              <h4>Company Name</h4>
              <h5>Number of reviews</h5>
              <h5>Rating</h5>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8">
                <nav class="navbar navbar-expand-lg navbar-light">
                  <div class="container-fluid">
                    <div
                      class="collapse navbar-collapse"
                      id="navbarTogglerDemo02"
                    >
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link active">
                            <Link
                              to="/snapshot"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Snapshot</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/whyJoinUs"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Why Join Us</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/reviews"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Reviews</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/addSalaryReview"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Salaries</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/companyPhotos"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Photos</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/jobs"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Jobs</h5>
                            </Link>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="col-2"></div>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CompanyTabs)
