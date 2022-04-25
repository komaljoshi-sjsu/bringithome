// Job Seeker Navigation bar after logging in

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  BsFillChatLeftTextFill,
  BsFillBellFill,
  BsSearch,
} from 'react-icons/bs'
import { IoMdPerson, IoMdSettings, IoMdHelpCircle } from 'react-icons/io'
import { ImProfile } from 'react-icons/im'
import { MdFavorite, MdReviews, MdEmail, MdPhoto } from 'react-icons/md'
import logo from '../../images/logo_signin.png'
import '../../CSS/JobSeekerNavbar.css'
import { logout } from '../../reduxutils/actioncreators/useraction'

class CustomerLoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: true,
      userEmail: '',
    }
  }

  componentDidMount() {
    let collection = document.getElementsByClassName('nav-link')
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].href === window.location.href) {
        collection[i].classList.add('active')
      } else {
        collection[i].classList.remove('active')
      }
    }

    const userInfo = this.props.userInfo
    if (userInfo) {
      this.setState({
        userEmail: userInfo.email,
      })
    }
  }

  logoutAction = (e) => {
    e.preventDefault()
    this.props.logout(true)
    // const {history} = this.props;
    // history.push('/landingPage');
    window.location.href = '/landingPage'
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand">
              <Link
                to="/landingPage"
                style={{
                  textDecoration: 'none',
                  color: '#474747',
                }}
              >
                <img
                  src={logo}
                  alt=""
                  width="130"
                  height="80"
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
                  <a class="nav-link active">
                    <Link
                      to="/landingPage"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5>Find Services</h5>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <Link
                      to="/allReviews"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5>Freelancer Reviews</h5>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <Link
                      to="/findSalaries"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
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
                    <a class="nav-link">
                      <Link
                        to="/messenger"
                        style={{
                          textDecoration: 'none',
                          color: '#474747',
                        }}
                      >
                        <h5
                          style={{
                            color: 'black',
                            marginLeft: '5px',
                            marginRight: '5px',
                          }}
                        >
                          <BsFillChatLeftTextFill />
                        </h5>
                      </Link>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <h5
                        style={{
                          color: 'black',
                          marginLeft: '5px',
                          marginRight: '5px',
                        }}
                      >
                        <BsFillBellFill />
                      </h5>
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
                          to="/resume"
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
                      <a class="dropdown-item ditems">
                        <Link
                          to="/myservices"
                          style={{
                            textDecoration: 'none',
                            color: '#474747',
                          }}
                        >
                          <MdFavorite
                            style={{ width: '40px', height: '25px' }}
                          />
                          <span className="spandrop">My Services</span>
                        </Link>
                      </a>
                      <a class="dropdown-item ditems">
                        <Link
                          to="/profileReviews"
                          style={{
                            textDecoration: 'none',
                            color: '#474747',
                          }}
                        >
                          <MdReviews
                            style={{ width: '40px', height: '25px' }}
                          />
                          <span className="spandrop">My Reviews</span>
                        </Link>
                      </a>
                      <a class="dropdown-item ditems">
                        <Link
                          to="/myPhotos"
                          style={{
                            textDecoration: 'none',
                            color: '#474747',
                            outline: 'none',
                          }}
                        >
                          <MdPhoto style={{ width: '40px', height: '25px' }} />
                          <span className="spandrop">My Photos</span>
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

//export default connect(mapStateToProps,mapDispatchToProps)(EmployerProfile);
const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CustomerLoggedIn))