// Employeer Navigation bar

import React, { Component } from 'react'
import logo from '../../images/indeedemployers_logo.png'
import {IoMdHelpCircle, IoMdChatboxes} from 'react-icons/io';
import {BsFillBellFill, BsPersonFill} from 'react-icons/bs';
import { Link } from 'react-router-dom'

class EmployerNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    let collection = document.getElementsByClassName("nav-link")
    for (let i = 0; i < collection.length; i++) {
        if(collection[i].href===window.location.href){
            collection[i].classList.add('active')
        }
        else{
            collection[i].classList.remove('active')
        }
    }
  }
  
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                src={logo}
                alt=""
                width="120"
                height="30"
                class="d-inline-block align-text-top"
              />
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul
                class="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginTop: '15px' }}
              >
                
                <li class="nav-item">
                  
                  <a class="nav-link active" aria-current="page" href="/Employer">
                  <Link to="/employer"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Applicant Page</h5>
                            </Link>
                    <h5></h5>
                  </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" >
                <Link to="/featuredReviews"
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
                  <a class="nav-link" >
                  <Link to="/employerAnalytics"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Report</h5>
                            </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul
                  class="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ marginTop: '15px' }}
                >
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>Help Center <IoMdHelpCircle/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>test</h5>
                    </a>
                  </li> 
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><BsFillBellFill/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><IoMdChatboxes/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                    <Link to="/employerUpdateProfile"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5 style={{ color: 'black' }}><BsPersonFill/></h5>
                            </Link>
                      
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default EmployerNavbar
