// Job Seeker Navigation bar

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo_signin.png'
import esp from '../../images/esp.png'
import eng from '../../images/eng.png'
import '../../CSS/JobSeekerNavbar.css'
// import { changeLanguage } from 'i18next'
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n/config'


class JobSeekerNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      t: this.props.t,
      i18n: this.props.i18n
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
                  <a class="nav-link active">
                    <Link
                      to="/landingPage"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5>{this.state.t('Find Services')}</h5>
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
                      <h5>{this.state.t('Freelancer Reviews')}</h5>
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
                    <a class="nav-link" href="/login">
                      <h5 style={{ color: 'blue' }}>{this.state.t('Sign In')}</h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <img src={eng} height="25px" width="25px" onClick={()=>this.state.i18n.changeLanguage('en')}/>
                  </li>
                  <li class="nav-item">
                    <img src={esp} height="25px" width="25px" onClick={()=>this.state.i18n.changeLanguage('es')} style={{marginLeft:'10px'}}/>
                  </li>
                  {/* <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <Link
                        to="/postJob"
                        style={{
                          textDecoration: 'none',
                          color: '#474747',
                        }}
                      >
                        <h5>Employers/Post Job</h5>
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

export default withTranslation()(JobSeekerNavbar)
