// Employer Landing Page
import React, { Component } from 'react'
import FreelancerNavbar from './FreelancerNavbar'
import {Button,Card,ListGroup,ListGroupItem,Modal,Row,Col,Pagination} from 'react-bootstrap';
import axios from "axios";
import backendServer from '../../webConfig';
import '../../CSS/EmployerLanding.css'
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import {companyActionCreator} from '../../reduxutils/actions.js';
// import { setId} from "../../actions/loginActions";
class Employer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      companyId:null,
      postedJobs: [],
      statusmsg:null,
      show:false,
      applicantsName : [],
      liststatus:null,
      applicantProfile:[],
      jobPreference:[],
      showprofile:false,
      curPage: 1,
      pageSize: 4,
      status:''
    }
    //this.getCurrentDate()
  }
  updatestatusfn = (myServId,status) =>{
   
    const statuschange = {
      id:myServId,
      status:status,
    }
    //console.log(ordertypedata)
   this.updateJobSeekerStatus(statuschange);
    
  }
  updateJobSeekerStatus = (statuschange)=>{
    console.log("BOOKING STATUS Changes", statuschange)
    // axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
     axios.post(`${backendServer}/updateJobSeekerStatus`, statuschange)
             .then(response => {
                 console.log(response)
             })
      alert("Booking status has been updated");
      this.handleModalClose();
      // window.location.href = '/freelancerHome';
  }
  componentDidMount() {
      //console.log("here")
      const companyId = this.props.company.compid;
      const compId = {
        companyId:companyId
      }
      const employerId = this.props.userInfo.id;
      const freelancerId ={
        employerId:employerId
      }
      // console.log(this.props.userInfo);
      // console.log(freelancerId);
      // axios.post(`${backendServer}/getPostedJobs`,compId).then((response) => {
        axios.post(`${backendServer}/api/getPostedService`,freelancerId).then((response) => {
        // console.log(response.data)
        if(response.status === 200){
          
          this.setState({
            postedJobs: this.state.postedJobs.concat(response.data),
          });
          this.setState({
            statusmsg: "Services Found"
          });
        }
      });
}
handleModalClose(){
  this.setState({applicantsName : []})
  this.setState({show:false}) 
}
handleModalCloseProfile(){
  this.setState({applicantsName : []})
  this.setState({showprofile:false}) 
  this.setState({applicantProfile : []})
  this.setState({jobPreference : []})
  
  
}
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props);
    this.props.history.push('/postService');
  }
  viewJobSeekerProfile = (id) => {
    const jobSeekerId = {
      id : id
    }
    axios.post(`${backendServer}/getJobSeekerProfile`,jobSeekerId).then((response) => {
      
      if(response.status === 200){
        console.log(response.data)
        this.setState({
          applicantProfile: this.state.applicantProfile.concat(response.data[0]),
        });
        this.setState({
          jobPreference: this.state.jobPreference.concat(response.data[1]),
        });
        this.setState({show:false})
        this.setState({showprofile:true})
        
      }
    });
  }
  onPage = (e) => {
    // console.log("In pagination");
    // console.log(e.target);
    // console.log(e.target.text);
    this.setState({
      curPage: e.target.text,
    });
  };
  viewUsersList = (val) => {
   const serviceId = {
     serviceId : val
   }
    axios.post(`${backendServer}/getApplicantsName`,serviceId).then((response) => {
      if(response.status === 200){
        console.log("customers list for booking",response.data)
        if(response.data.length >=1) {
          this.setState({liststatus : "Applicants List"})
        }else{
          this.setState({liststatus : null})
        }
        this.setState({
          applicantsName: this.state.applicantsName.concat(response.data),
        });
      }
      
    });
    this.setState({
      show:true
    })
  }
  handleChange = (e, jobseekerid) => {
    console.log("id",jobseekerid)
    const { applicantsName } = this.state;
    let index ;
    for(let i= 0; i<applicantsName.length;i++){
      console.log(applicantsName[i]);
      if(applicantsName[i].myServId === jobseekerid){
        index = i;
        break;
      }
    }
    const orders = [...applicantsName];
    console.log(e.target.value);
    orders[index].status = e.target.value;
    this.setState({ applicantsName: orders });
  }



  render() {
    const {applicantsName,statusmsg,liststatus,applicantProfile,jobPreference} = this.state;
    var serviceList = null; var applicantsList = null; var profile = null;
    let paginationItemsTag = [];
    let items = this.state.postedJobs;
    let pgSize = this.state.pageSize;
    let count = 1;
    let num = items.length / pgSize;
    // console.log(items.length / pgSize);
    //console.log(Number.isInteger(items.length / pgSize));
    if (Number.isInteger(num)) {
      count = num;
    } else {
      count = Math.floor(num) + 1;
    }
  // console.log("count:", count);
  // console.log("items.length:", items.length);
  let active = this.state.curPage;

  for (let number = 1; number <= count; number++) {
    paginationItemsTag.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  let start = parseInt(pgSize * (this.state.curPage - 1));
        let end = this.state.pageSize + start;
        //   console.log("start: ", start, ", end: ", end);
        let displayitems = [];
        if (end > items.length) {
          end = items.length;
        }
        for (start; start < end; start++) {
          displayitems.push(items[start]);
        }
        
    if(liststatus === "Applicants List"){
      applicantsList = (
        <div>
          {applicantsName.map(applicant=>
          <div>
            <Row>
              <Col>
              <Button
              onClick={() => {
                this.viewJobSeekerProfile(applicant.id);
              }}
              style = {{width:"125px"}} variant="Link">{applicant.name}</Button>
              </Col>
              <Col>
              <Button style = {{width:"125px"}} variant="Link">{applicant.servicename}</Button>
              </Col>
              <Col>
              <Button variant="Link">{applicant.date}</Button>
              </Col>
              <Col>
              <Button variant="Link">{applicant.time}</Button>
              </Col>
              <Col>
             <select name="status" value={applicant.status} onChange={(e) => { this.handleChange(e,applicant.myServId)}}  >
                <option>Choose Status</option>
                <option value="Booked">Accepted</option> 
                <option value="Cancelled" >Cancelled</option>
            	</select>
              </Col>
              <Col>
              <Button className="statusbtn"
                type="submit" 
                onClick={() => {
                this.updatestatusfn(applicant.myServId,applicant.status);
                }}>
                Change
              </Button>
              </Col>
            </Row>
            </div>
          )}
        </div>
      )
    }else{
      applicantsList = (
        <div>
          No Customer booked this service.
        </div>
      )
    }
    if(applicantProfile){
      profile = (
        <div>
          {applicantProfile.map(applicant=>
            <div>
               
                <h5>Profile Details</h5>
              <Row>
                <Col>
                <h6>Email :</h6>{applicant.email}
                </Col>
                </Row>
                <Row>
                <Col>
                <h6>Phone :</h6> {applicant.jobSeekerContact}
                </Col>
              </Row>

            </div>
          )}
            <br/>   
        {jobPreference.map(job=>
            <div>
               <h5>Job Preferences</h5>
              <Row>
                <Col>
               Job Title : {job.JobTitle}
                </Col>
                </Row>
                <Row>
                <Col>
                Job Types : {job.JobTypes}
                </Col>
              </Row>
              <h6>Work Schedules :</h6>
               
              <Row>
                <Col>
                <h6>Range:</h6>
                {job.WorkSchedules.range.map(range=>
                <div>
                  {range}
                </div>
                )}
                <br/>
                <h6>Shifts:</h6>
                {job.WorkSchedules.shifts.map(other=>
                <div>
                  {other}
                </div>
                )}
                <br/>
                <h6>Other:</h6>
                {job.WorkSchedules.other.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
              </Row> 
              <h6>Pay:</h6>
              <Row>
                <Col>
               Category : {job.pay.category}
               &nbsp;&nbsp;
               Amount : {job.pay.amount}
                </Col>
                </Row>
               
              <Row>
                <Col>
                <h6>Relocation:</h6>{job.relocation}
                </Col>
                </Row>
                <h6>Remote:</h6>
                <Row>
                <Col>
                {job.remote.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
                </Row>
            </div>
          )}
        </div>
      )

    }
    if(statusmsg === "Services Found"){
      
      serviceList = (
      <div >
        {displayitems && displayitems.length > 0 ? (
        <div className="card-list">
            {displayitems.map(service=> {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card style={{ width: "20rem" }}>
                  <Card.Body>
                  <Card.Title><Button  variant="link" 
                  onClick={() => {
                    this.viewUsersList(service._id);
                  }}>
                    <h5>{service.serviceName}</h5>
                    </Button>
                    </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Category: {service.serviceCategory}</ListGroupItem>
                    <ListGroupItem>Mode: {service.serviceMode}</ListGroupItem>
                    <ListGroupItem>Price: ${service.price}</ListGroupItem>
                    <ListGroupItem>From: {new Date(service.availability.startDate).toDateString()}, {service.availability.startTime} <br/>To: {new Date(service.availability.endDate).toDateString()}, {service.availability.endTime}</ListGroupItem>
                    {/* <ListGroupItem>Total Customers : {service.applicantsNo}</ListGroupItem> */}
                  </ListGroup> 
                  </Card.Body> 
                  </Card>                           
                </div>
              )
            } 
        )
      }
        </div>
        ):(
        <div style={{display: 'flex',justifyContent:"center",marginTop:"5%",color:"blue"}}>
          <h4 className="">No Service Available </h4>
        </div>
        )
      }
      </div>
      )
    }
    return (
      <div >
        <FreelancerNavbar/>
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Service Provider:
                <span class="hoverUnderline" style={{ color: '#003399',marginLeft:"20px"}}>
                 <Button onClick={this.handleSubmit}>Post a Service</Button>
                </span>
              </h5>
            </div>
           
          </div>
        </div>
        <hr />
        <div className="container">  <h5 style={{ marginLeft: '40%',marginBottom:'50px'}}>Available Services</h5></div>
        {serviceList}
        <Pagination 
                    onClick={this.onPage}
                    className="pageJobs" style={{display: 'flex',justifyContent:"center",marginTop:"5%"}}>
                    {paginationItemsTag}
                </Pagination>
        <div>
         <Modal size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton><h4>Customer Booking List </h4>
             
             </Modal.Header>
             
             
             <Modal.Body>
              
             {applicantsList}
             
             </Modal.Body>
             
           </Modal>
          </div>
          <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showprofile} onHide={()=>this.handleModalCloseProfile()}>
             <Modal.Header closeButton><h4>Profile </h4>
             </Modal.Header>
             
             
             <Modal.Body>
             
             {profile}
             
             </Modal.Body>
             
           </Modal>
          </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  company: state.company
})

export default connect(mapStateToProps)(Employer);


// Employer.propTypes = {
//   setId: PropTypes.func.isRequired,
//   id: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     id: state.id
//   };
// };
// export default connect(mapStateToProps, {setId})(Employer);


