// Admin Navigation bar

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../images/Indeed_logo.png'
import '../../CSS/JobSeekerNavbar.css'

class AdminNavbar extends Component {
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
            <a class="navbar-brand" href="/landingPage">
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
                {/* <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">
                    <h5>Dashboard</h5>
                  </a>
                </li> */}
                <li class="nav-item">
                  <a class="nav-link" href="/adminCompany">
                    <h5>Companies</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/adminPhotos">
                    <h5>Photos</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/adminReviews">
                    <h5>Reviews</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/adminAnalytics">
                    <h5>Analytics</h5>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default AdminNavbar;
