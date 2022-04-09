//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,InputGroup,Modal
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import FreelancerNavbar from './FreelancerNavbar'
import {MdModeEdit} from 'react-icons/md';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
// import { response } from 'express';

class EmployerProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          employerId : '',
          employerDetails:{},
          empdetails:true,
          compdetails:true,
          companyName: '',
          industry: '',
          jobTitle: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          jobMode: '',
          jobType: '',
          salaryDetails: '',
          shortJobDescription: '',
          errors: {},
          successMsg: '',
          errorMsg: '',
          show:false,
          update:true,
          companyupdated:true
      };
    }
    
      componentDidMount() {
        const empid = {
            empid: this.props.userInfo.id
        };
        console.log(empid) 
        axios.post(`${backendServer}/api/getFreelancerDetails`,empid).then((response) => {
            console.log("Freelancer Details",response.data[0]);
            this.setState({
                employerDetails : response.data[0],
            });
        });
    }
 
    
    handleChangeCompanyName = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyName = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
    handleChangeWebsite = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.website = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanySize = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companySize = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeAbout = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.about = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanyType = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyType = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeDescription = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyDescription = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeRevenue = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.revenue = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeHeadquarters = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.headquarters = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeIndustry = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.industry = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeFounded = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.founded = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeMission = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.mission = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeWorkculture = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.workCulture = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanyValues = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyValues = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCeo = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.ceo = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
    handleChangeEmpName = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.name = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeRole = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.roleInCompany = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeAddress = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.address = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCity = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.city = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeState = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.state = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeZipcode = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.zipcode = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      
      handleChangeCountry = (val) =>{ 
        const { employerDetails }= this.state;
        employerDetails.country = val;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleEmpDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsEmp();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            this.sendEmployerAPI(this.state.employerDetails);
            this.setState({
                updated : true 
            });
            this.setState({
                show : true 
            });
        }  
    }
    handleCompDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsCompany();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            this.sendCompanyAPI(this.state.employerDetails);
            this.setState({
                companyupdated : true 
            });
            this.setState({
                show : true 
            });
        }    
        
    }
    findFormErrorsEmp = () => {
      const {employerDetails,errors} = this.state;
      if(!employerDetails.name || employerDetails.name === '') errors.employerName = 'Employer Name cannot be blank!';
      if(!employerDetails.address || employerDetails.address === '') errors.address = 'Address cannot be blank!';
      if(!employerDetails.city || employerDetails.city === '') errors.city = 'City cannot be blank!';
      if(!employerDetails.state || employerDetails.state === '') errors.state = 'State cannot be blank!';
      if(!employerDetails.country || employerDetails.country === '') errors.country = 'Country cannot be blank!';
      if(!employerDetails.zipcode || employerDetails.zipcode === '') errors.zipcode = 'Zipcode cannot be blank!';  
      return errors;
    }

    sendEmployerAPI = (data) => {
        axios.post(`${backendServer}/api/editFreelancerDetails`, data)
            .then(response=> {
                // console.log("Updated data",response.data[0])
                if (response.status === 200) {
                    this.setState({
                        successMsg: response.data
                    })
                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }    
    sendCompanyAPI = (data) => {
        axios.post(`${backendServer}/editCompanyDetails`, data)
            .then(response=> {
                if (response.status === 200) {
                    this.setState({
                        successMsg: response.data
                    })
                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }
    handleModalClose(){
        this.setState({show:!this.state.show}) 
        this.setState({
            updated : true
        })
        this.setState({
            companyupdated : true
        })
    }
    employerdetails = (e) =>{
        this.setState({
            empdetails : false
        })
        this.setState({
            updated : false
        })
    }
    companydetails = (e) =>{
        this.setState({
            compdetails : false
        })
        this.setState({
            companyupdated : false
        })
    }
    render() {
       const {successMsg,errorMsg,updated,errors} = this.state;
       var empdetailscol = null;    
       if(this.state.empdetails || updated){
           empdetailscol = (
               <div>
                    <label className="dethead1">Name :</label> <label className="dethead">{this.state.employerDetails.name}</label>
                    <br/>
                    <br/>
                    <Row>
                        {/* <Col>
                        <label className="dethead1">Role :</label><label className="dethead">{this.state.employerDetails.roleInCompany}</label>
                        </Col> */}
                        <Col>
                        <label className="dethead1">Address :</label><label className="dethead">{this.state.employerDetails.address}</label>
                        </Col>
                    </Row>  
                    <br/>  
                    <Row>
                        <Col>
                        <label className="dethead1">City :</label><label className="dethead">{this.state.employerDetails.city}</label>
                        </Col>
                        <Col>
                        <label className="dethead1">State :</label><label className="dethead">{this.state.employerDetails.state}</label>
                        </Col>
                    </Row> 
                    <br/>  
                    <Row>
                        <Col>
                        <label className="dethead1">Country :</label><label className="dethead">{this.state.employerDetails.country}</label>
                        </Col>
                        <Col>
                        <label className="dethead1">Zipcode :</label><label className="dethead">{this.state.employerDetails.zipcode}</label>
                        </Col>
                    </Row> 
                   
                    
               </div>
           )
       }else if(!this.state.empdetails){
        empdetailscol = (
            <div>
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                <label>Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.employerName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="name" 
                 value={this.state.employerDetails.name}
                 onChange={(e) => { this.handleChangeEmpName(e)}}></input>
                 </Row>
                 {/* <br/>
                 <Row>
                 <label>Role<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.roleInCompany}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="roleInCompany" 
                 value={this.state.employerDetails.roleInCompany}
                 onChange={(e) => { this.handleChangeRole(e)}}></input>
                 </Row> */}
                 <br/>
                 <Row>
                 <label>Address<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.address}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="address"
                  value={this.state.employerDetails.address}
                  onChange={(e) => { this.handleChangeAddress(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>City<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.city}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="city"
                  value={this.state.employerDetails.city}
                  onChange={(e) => { this.handleChangeCity(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>State<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.state}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="state" 
                 value={this.state.employerDetails.state}
                 onChange={(e) => { this.handleChangeState(e)}}></input>
                 </Row>
                 
                 <br/>
                 <Row>
                 <label>Country<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.country}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<CountryDropdown className="detinput"
                    value={this.state.employerDetails.country}
                    onChange={(val) => { this.handleChangeCountry(val)}}       
                  />
                 </Row>
                 <br/>
                 <Row>
                 <label>zipcode<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}> {errors.zipcode}</span>
                
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="zipcode" 
                 value={this.state.employerDetails.zipcode}
                 onChange={(e) => { this.handleChangeZipcode(e)}}></input>
                 </Row>
                 <br/>
                 </Col>
                 
                 <Button onClick = {this.handleEmpDetails}>Save</Button>
            </div>
        )
    }    
   
      return (
        <div>
             <FreelancerNavbar/>
            <br></br>
            
            <div className="main-div1">
            <div className = "details">   
            <h3 style={{color:"blue"}}>Update Profile</h3><span className="editdetails"/><Button onClick={this.employerdetails} variant = "white" ><MdModeEdit/></Button>
            </div> <br/>  
             {empdetailscol}<br/><br/>
            </div>
            {/* <div className="main-div1">
            <div className = "details">   
            <h3>Company Details</h3><span className="editdetails"/><Button onClick={this.companydetails} variant = "white"><MdModeEdit/></Button>
            </div> 
              {compdetailscol}
            </div> */}
            <div>
            <Modal size="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton>
                <Modal.Title>{successMsg} {errorMsg}</Modal.Title>
                </Modal.Header>
            </Modal>
      </div>
       
           
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(EmployerProfile);
