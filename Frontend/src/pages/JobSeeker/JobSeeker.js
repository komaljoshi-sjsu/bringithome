// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../CSS/JobSeekerLanding.css'
import TextField from '@mui/material/TextField'
import { RatingView } from 'react-simple-star-rating'
import { makeStyles } from '@material-ui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import JobSeekerNavbar from './JobSeekerNavbar'
import Pagination from './../JobSeeker/Pagination'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
//       // Default transform is "translate(14px, 20px) scale(1)""
//       // This lines up the label with the initial cursor position in the input
//       // after changing its padding-left.
//       transform: 'translate(34px, 20px) scale(1);',
//       width: '',
//     },
//   },
//   inputRoot: {
//     color: 'purple',
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26,
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'green',
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'purple',
//     },
//   },
// }))

class JobSeekerLandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      whatVal: '',
      whereVal: '',
      allJobs: [],
      jobs: [],
      whatSearch: [],
      whereSearch: [],
      noOfCompanyReviews: [],
      avgCompanyRating: [],
      roleName: '',
      companyName: '',
      companyId: '',
      jobId: '',
      city: '',
      state: '',
      zip: '',
      rating: 0,
      reviewCount: 0,
      jobType: '',
      salary: '',
      location: '',
      responsibilities: '',
      qualifications: '',
      loveJobRole: '',
      currentPage: 1,
      totalPosts: 0,
    }
    this.getCurrentDate()
  }

  getCurrentDate() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    var dateObj = new Date()
    var month = monthNames[dateObj.getMonth()]
    var day = dateObj.getUTCDate()
    var year = dateObj.getUTCFullYear()
    console.log(month + ' ' + day + ' ' + year)

    this.state.month = month
    this.state.day = day
    this.state.year = year
    return year + '-' + (dateObj.getMonth() + 1) + '-' + day
  }

  componentDidMount() {
    this.getAllData()
  }

  async getAllData() {
    let job
    await axios.get('http://localhost:5000/jobSeeker/home').then(
      (response) => {
        console.log(response.data, response.status)
        let jobTitles = response.data.map((job) => {
          return job.jobTitle
        })

        console.log('Job Titles: ')
        console.log(jobTitles)

        let companyNames = response.data.map((job) => {
          return job.companyName
        })

        console.log('Company Names: ')
        console.log(companyNames)

        let whatSearch = jobTitles.concat(companyNames)

        whatSearch = whatSearch.filter(
          (job, index, self) => index === self.findIndex((j) => j === job),
        )

        let city = response.data.map((job) => {
          return job.city
        })
        let state = response.data.map((job) => {
          return job.state
        })
        let zip = response.data.map((job) => {
          return job.zip
        })
        let whereSearch = city.concat(state, zip)

        // remove duplicate job titles
        whereSearch = whereSearch.filter(
          (job, index, self) => index === self.findIndex((j) => j === job),
        )

        job = response.data[0]

        this.setState({
          allJobs: this.state.allJobs.concat(response.data),
          whatSearch: whatSearch,
          whereSearch: whereSearch,
          roleName: job.jobTitle,
          companyName: job.companyName,
          companyId: job.companyId,
          jobId: job.jobId,
          city: job.city,
          state: job.state,
          zip: job.zip,
          jobType: job.jobMode,
          salary: job.salaryDetails,
          location: job.city,
          totalPosts: response.data.length,
        })
      },
      (error) => {
        console.log(error)
      },
    )

    await axios.get('http://localhost:5000/jobSeeker/getCompanyReviews').then(
      (response) => {
        console.log(response.data, response.status)

        this.setState({
          noOfCompanyReviews: this.state.noOfCompanyReviews.concat(
            response.data,
          ),
        })
        let companyId = job.companyId
        let reviews = this.state.noOfCompanyReviews.filter(
          (reviews) => reviews.companyId === companyId,
        )

        if (reviews.length > 1) {
          reviews = reviews[0]

          this.setState({ reviewCount: reviews.NoOfReviews })
        } else this.setState({ reviewCount: 0 })
      },
      (error) => {
        console.log(error)
      },
    )

    await axios.get('http://localhost:5000/jobSeeker/getCompanyRating').then(
      (response) => {
        console.log(response.data, response.status)

        this.setState({
          avgCompanyRating: this.state.avgCompanyRating.concat(response.data),
        })
        let companyId = job.companyId
        let avgrating = this.state.avgCompanyRating.filter(
          (rating) => rating.companyId === companyId,
        )

        if (avgrating.length > 1) {
          avgrating = avgrating[0]
          this.setState({ rating: avgrating.avgRating })
        } else this.setState({ rating: 0 })
      },
      (error) => {
        console.log(error)
      },
    )

    await this.getPaginatedData()
  }

  getPaginatedData() {
    let data = { currentPage: this.state.currentPage }
    axios
      .post('http://localhost:5000/jobSeeker/paginatedData', data)
      .then((response) => {
        console.log(response.data, response.status)

        this.setState({
          jobs: response.data,
        })
      })
  }

  handleWhatVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)
    if (value)
      this.setState({
        whatVal: value,
      })
    if (evt.target.value)
      this.setState({
        whatVal: evt.target.value,
      })
  }

  handleWhereVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)

    if (value)
      this.setState({
        whereVal: value,
      })
    if (evt.target.value)
      this.setState({
        whereVal: evt.target.value,
      })
  }

  handleFindJobs() {
    console.log('In find')
    console.log(this.state.whereVal, this.state.whatVal)
    let job = []
    let totalCount = 0
    if (this.state.whereVal.length && this.state.whatVal) {
      console.log('What and where')
      let data = {
        currentPage: 1,
        wherekeyword: this.state.whereVal,
        whatkeyword: this.state.whatVal,
      }
      axios
        .post('http://localhost:5000/jobSeeker/filterOnLocationAndTitle', data)
        .then((response) => {
          console.log(response.data, response.status)
          job = response.data.result
          totalCount = response.data.count[0].count

          if (job.length > 0) {
            console.log('setting jobs')
            this.setState({
              jobs: job,
              totalPosts: totalCount,
              roleName: job[0].jobTitle,
              companyName: job[0].companyName,
              companyId: job[0].companyId,
              jobId: job[0].jobId,
              city: job[0].city,
              state: job.state,
              zip: job[0].zip,
              jobType: job[0].jobMode,
              salary: job[0].salaryDetails,
              location: job[0].city,
            })
          }
        })
    } else if (this.state.whereVal.length && !this.state.whatVal) {
      console.log('only where')
      let data = { currentPage: 1, keyword: this.state.whereVal }
      axios
        .post('http://localhost:5000/jobSeeker/filterOnLocation', data)
        .then((response) => {
          console.log(response.data, response.status)
          job = response.data.result
          totalCount = response.data.count[0].count

          if (job.length > 0) {
            console.log('setting jobs')
            this.setState({
              jobs: job,
              totalPosts: totalCount,
              roleName: job[0].jobTitle,
              companyName: job[0].companyName,
              companyId: job[0].companyId,
              jobId: job[0].jobId,
              city: job[0].city,
              state: job.state,
              zip: job[0].zip,
              jobType: job[0].jobMode,
              salary: job[0].salaryDetails,
              location: job[0].city,
            })
          }
        })
    } else if (!this.state.whereVal.length && this.state.whatVal) {
      console.log('only what')
      let data = { currentPage: 1, keyword: this.state.whatVal }
      axios
        .post(
          'http://localhost:5000/jobSeeker/filterOnJobTitleOrCompanyName',
          data,
        )
        .then((response) => {
          console.log(
            response.data.result,
            response.status,
            response.data.count[0].count,
          )
          job = response.data.result
          totalCount = response.data.count[0].count

          if (job.length > 0) {
            console.log('setting jobs')
            this.setState({
              jobs: job,
              totalPosts: totalCount,
              roleName: job[0].jobTitle,
              companyName: job[0].companyName,
              companyId: job[0].companyId,
              jobId: job[0].jobId,
              city: job[0].city,
              state: job.state,
              zip: job[0].zip,
              jobType: job[0].jobMode,
              salary: job[0].salaryDetails,
              location: job[0].city,
            })
          }
        })
    }
  }

  handleCardClick = (evt) => {
    console.log(evt.currentTarget.id)
    let jobId = parseInt(evt.currentTarget.id)
    let job = this.state.allJobs.filter((job) => job.jobId === jobId)[0]

    console.log(job.jobTitle)
    console.log(job.companyId)
    let companyId = job.companyId
    let reviews = this.state.noOfCompanyReviews.filter(
      (reviews) => reviews.companyId === companyId,
    )
    if (reviews.length > 1) {
      reviews = reviews[0]

      this.setState({ reviewCount: reviews.NoOfReviews })
    } else this.setState({ reviewCount: 0 })
    let avgrating = this.state.avgCompanyRating.filter(
      (rating) => rating.companyId === companyId,
    )
    if (avgrating.length > 1) {
      avgrating = avgrating[0]
      this.setState({ rating: avgrating.avgRating })
    } else this.setState({ rating: 0 })

    console.log(reviews.NoOfReviews)
    console.log(avgrating.avgRating)

    this.setState({
      roleName: job.jobTitle,
      companyName: job.companyName,
      companyId: job.companyId,
      jobId: job.jobId,
      city: job.city,
      state: job.state,
      zip: job.zip,
      jobType: job.jobMode,
      salary: job.salaryDetails,
      location: job.city,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      loveJobRole: job.loveJobRole,
    })
  }

  async handleCompanyLink() {
    const payload1 = this.state.companyName

    this.props.companyName(payload1)

    const payload2 = this.state.companyId

    this.props.companyId(payload2)

    let data = { id: this.state.companyId }
    console.log(data)
    await axios
      .post('http://localhost:5000/jobSeeker/updateNoOfViews', data)
      .then((response) => {
        console.log(response.data, response.status)
      })

    this.props.history.push('/snapshot')
  }

  handleApply(evt) {
    console.log(evt.currentTarget.id)
    const jobId = evt.currentTarget.id
    const userInfo = this.props.userInfo
    const companyId = this.state.companyId
    const appliedDate = this.getCurrentDate()
    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const id = userInfo.id
      console.log(id)
      const data = { appliedDate, jobId, id, companyId }
      console.log(data)
      axios
        .post('http://localhost:5000/jobSeeker/applyJob', data)
        .then((response) => {
          console.log(response.data, response.status)
        })
    } else {
      console.log("User didn't sign in")
      this.props.history.push('/login')
    }
  }

  async handleSaveJob(evt) {
    console.log(evt.currentTarget.id)
    const companyId = evt.currentTarget.id
    const userInfo = this.props.userInfo
    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const userId = userInfo.id
      const data = { companyId, userId }
      await axios
        .post('http://localhost:5000/jobSeeker/saveJob', data)
        .then((response) => {
          console.log(response.data, response.status)
        })
    } else {
      console.log("User didn't sign in")
      this.props.history.push('/login')
    }
  }

  paginate = (pageNumber) => {
    console.log(pageNumber)
    this.setState(
      {
        currentPage: pageNumber,
      },
      () => {
        this.getPaginatedData()
      },
    )
  }

  render() {
    return (
      <div>
        <JobSeekerNavbar />
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>What</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whatVal}
                      onChange={this.handleWhatVal.bind(this)}
                      options={this.state.whatSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 180, borderBottom: 'none' }}
                          //class="whatSearch2"
                          onChange={this.handleWhatVal.bind(this)}
                          value={this.state.whatVal}
                        />
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-search"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>Where</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whereVal}
                      onChange={this.handleWhereVal}
                      options={this.state.whereSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 180, borderBottom: 'none' }}
                          //class="whatSearch2"
                          value={this.state.whereVal}
                          onChange={this.handleWhereVal}
                        />
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-geo-alt"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    class="btn findbtn"
                    onClick={this.handleFindJobs.bind(this)}
                  >
                    <h5 style={{ marginTop: '4px', color: 'white' }}>
                      Find Jobs
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
              <h5>
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  Post your resume
                </span>
                &nbsp;- It only takes a few seconds
              </h5>
            </div>
            <div class="col-4"></div>
          </div>

          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Employers:
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  Post a Job
                </span>
              </h5>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
        <hr />
        <div id="third" class="row" style={{ marginTop: '10px' }}>
          <div class="row">
            <div class="col-4"></div>
            <div class="col-7">
              <div class="row">
                <div class="col-3">
                  <h3
                    class="headinghoverUnderline"
                    style={{ color: '#003399' }}
                  >
                    <u style={{ color: '#003399' }}>Job feed </u>
                  </h3>
                </div>
                <div class="col-4">
                  <h3 class="headinghoverUnderline">Recent Searches</h3>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        <div
          id="third"
          class="row "
          style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}
        >
          <div class="row">
            <div class="col-2"></div>
            <div class="col-4" style={{ marginLeft: '0px' }}>
              <h4 style={{ marginTop: '10px' }}>
                {this.state.month} {this.state.day}, {this.state.year}
              </h4>
              Job based on your searches
              {this.state.jobs.map((job) => (
                <div
                  class="card cardStyle2"
                  id={job.jobId}
                  onClick={this.handleCardClick}
                >
                  <div class="card-body">
                    <h4 class="card-title">{job.jobTitle}</h4>
                    <h6 class="card-title">{job.companyName}</h6>
                    <h6 class="card-title">
                      {job.city}, {job.state}, {job.zip}
                    </h6>
                    <h6 class="card-title">$ {job.salaryDetails}</h6>
                    <br />
                    <br />
                    <p class="card-text">{job.shortJobDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="col-5">
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">{this.state.roleName}</h4>
                  <h6
                    class="card-title companyNameCss"
                    onClick={this.handleCompanyLink.bind(this)}
                  >
                    {this.state.companyName}
                  </h6>
                  <RatingView ratingValue={this.state.rating} />
                  <br />
                  <h6 class="card-title">{this.state.reviewCount} reviews</h6>
                  <h6 class="card-title">
                    {this.state.city}, {this.state.state}
                  </h6>
                  <h6 class="card-title">{this.state.zip}</h6>
                  You must create an Indeed account before continuing to the
                  company website to apply
                  <br />
                  <br />
                  <div class="btn-group" role="group" aria-label="Third group">
                    <button
                      type="button"
                      class="btn applybtn"
                      onClick={this.handleApply.bind(this)}
                      id={this.state.jobId}
                    >
                      <h5 style={{ marginTop: '4px', color: 'white' }}>
                        Apply On Company Site
                      </h5>
                    </button>
                  </div>
                  <div class="btn-group" role="group" aria-label="Third group">
                    <button
                      type="button"
                      class="btn savebtn"
                      id={this.state.companyId}
                      onClick={this.handleSaveJob.bind(this)}
                    >
                      <h5 style={{ marginTop: '4px', color: 'white' }}>Save</h5>
                    </button>
                  </div>
                  <br />
                  <br />
                  <hr />
                  <br />
                  <h5 class="card-title">Job details</h5>
                  <br />
                  <h6>Job Type:</h6>
                  <h6>{this.state.jobType}</h6> <br />
                  <h6>Salary:</h6>
                  <h6>${this.state.salary}</h6>
                  <br />
                  <hr />
                  <h5 class="card-title">Full Job Description</h5>
                  <br />
                  <h6>Location:</h6>
                  <h6>{this.state.location}</h6>
                  <br />
                  <h6>Job Description:</h6>
                  <br />
                  <h6>What you will do:</h6>
                  <h6>{this.state.responsibilities}</h6>
                  <br />
                  <h6>What you will need:</h6>
                  <h6>{this.state.qualifications}</h6> <br />
                  <h6>Why You’ll love working:</h6>
                  <h6>{this.state.loveJobRole}</h6> <br />
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        <Pagination
          postsPerPage={5}
          totalPosts={this.state.totalPosts}
          paginate={this.paginate}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('dispatching props')
  return {
    companyName: (payload) => {
      dispatch({ type: 'setCompName', payload })
    },
    companyId: (payload) => {
      dispatch({ type: 'setCompId', payload })
    },
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(JobSeekerLandingPage))
