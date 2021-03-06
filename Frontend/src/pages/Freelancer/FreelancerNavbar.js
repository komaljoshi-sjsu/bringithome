// Employeer Navigation bar

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import {IoMdHelpCircle, IoMdChatboxes, IoMdPerson} from 'react-icons/io';
import {BsFillBellFill, BsPersonFill} from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { ImProfile } from 'react-icons/im'
import { logout } from '../../reduxutils/actioncreators/useraction'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class FreelancerNavbar extends Component {
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
  
  logoutAction = (e) => {
    e.preventDefault()
    this.props.logout(true)
    // const {history} = this.props;
    // history.push('/landingPage');
    window.location.href = '/login'
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand">
            <Link
                to="/freelancerHome"
                style={{
                  textDecoration: 'none',
                  color: '#474747',
                }}
              >
              <img
                src={logo}
                alt=""
                width="120"
                height="50"
                class="d-inline-block align-text-top"
              />
              </Link>
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul
                class="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginTop: '15px' }}
              >
                
                <li class="nav-item">
                  
                  <a class="nav-link active" aria-current="page" href="/freelancerHome">
                  <Link to="/freelancerHome"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Home</h5>
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
                  <Link to="/freelancerAnalytics"
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
                      <h5 style={{ color: 'black' }}><BsFillBellFill/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/messenger">
                      <h5 style={{ color: 'black' }}><IoMdChatboxes/></h5>
                    </a>
                  </li>  
              <li class="nav-item dropdown">
                    <a class="nav-link" data-bs-toggle="dropdown">
                      <h5
                        style={{
                          color: 'black',
                          marginLeft: '5px',
                          marginRight: '5px',
                        }}
                      >
                        <IoMdPerson />
                      </h5>
                    </a>
                    <div class="dropdown-menu dmenu">
                      <div class="dropemail">{this.state.userEmail}</div>
                      <a class="dropdown-item ditems">
                        <Link
                          to="/freelancerUpdateProfile"
                          style={{
                            textDecoration: 'none',
                            color: '#474747',
                          }}
                        >
                          <ImProfile
                            style={{ width: '40px', height: '25px' }}
                          />
                          <span className="spandrop">Profile</span>
                        </Link>
                      </a>
                      <div class="dropdown-divider ditems"></div>
                      <a class="dropdown-item" onClick={this.logoutAction}>
                        <span className="signoutdrop">Sign Out</span>
                      </a>
                    </div>
                    </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>Help Center <IoMdHelpCircle/></h5>
                    </a>
                  </li>
                  {/* <li class="nav-item">
                    <a class="nav-link">
                    <Link to="/freelancerUpdateProfile"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5 style={{ color: 'black' }}><BsPersonFill/></h5>
                            </Link>
                      
                    </a>
                  </li> */}
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: (val) => dispatch(logout(val)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FreelancerNavbar))

// export default FreelancerNavbar
