//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,InputGroup,Modal,Dropdown
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import {useDispatch} from 'react-redux';
import FreelancerNavbar from './FreelancerNavbar'
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import logo from '../../images/logo_signin.png'
// import {setEmpId} from '../../reduxutils/actioncreators/companyaction';

class FreelancerProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          employerId : '',
          employerDetails:{},
          empdetails:false,
          employerName:'',
          address:'',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          errors: {},
          update:true,
          empupdated:false,
      };
    }

    handleEmpDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsEmp();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            const employerData = {
                employerId : this.props.userInfo.id,
                employerName:this.state.employerName,
                address:this.state.address,
                city:this.state.city,
                state:this.state.state,
                country:this.state.country,
                zipcode:this.state.zipcode
            }
            this.sendEmployerAPI(employerData);
            this.setState({
                empupdated : true 
            });
            
        }  
    }
    
    handleChangeCountry = (val) => {
        this.setState({ country: val });
        this.setState({
            errors: {},
          });
      }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            errors: {},
          });
    } 

    sendEmployerAPI = (data) => {
        console.log("add emp")
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/api/postEmployerDetails`, data)
            .then(response=> {
                console.log(response.data)
                if (response.status === 200) {
                    console.log(response)
                    this.setState({
                        successMsg: response.data
                    })
            const {history} = this.props;
            history.push('/freelancerHome'); 
                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }  

    //Error handling
    findFormErrorsEmp = () => {
        const {errors} = this.state;
        if(!this.state.employerName || this.state.employerName === '') errors.employerName = 'Employer Name cannot be blank!';
        if(!this.state.address || this.state.address === '') errors.address = 'Address cannot be blank!';
        if(!this.state.city || this.state.city === '') errors.city = 'City cannot be blank!';
        if(!this.state.state || this.state.state === '') errors.state = 'State cannot be blank!';
        if(!this.state.country || this.state.country === '') errors.country = 'Country cannot be blank!';
        if(!this.state.zipcode || this.state.zipcode === '') errors.zipcode = 'Zipcode cannot be blank!';  
        return errors;
      }


      render() {
        const {empupdated,errors} = this.state;
        var empdetailscol = null;    

        console.log("Check",empupdated);
        if(empupdated){
         empdetailscol = (
             <div>                  
                  <label className="dethead1">Name :</label> <label className="dethead">{this.state.employerName}</label>
                  <br/>
                  <br/>
                  <Row>
                      <Col>
                      <label className="dethead1">Address :</label><label className="dethead">{this.state.address}</label>
                      </Col>
                  </Row>  
                  <br/>  
                  <Row>
                      <Col>
                      <label className="dethead1">City :</label><label className="dethead">{this.state.city}</label>
                      </Col>
                      <Col>
                      <label className="dethead1">State :</label><label className="dethead">{this.state.state}</label>
                      </Col>
                  </Row> 
                  <br/>  
                  <Row>
                      <Col>
                      <label className="dethead1">Country :</label><label className="dethead">{this.state.country}</label>
                      </Col>
                      <Col>
                      <label className="dethead1">Zipcode :</label><label className="dethead">{this.state.zipcode}</label>
                      </Col>
                  </Row> 
             </div>
         )}else if(!empupdated){
         empdetailscol = (
             <div>
                 <Col>
                 <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                 <Row>
                 <label>Name<span style={{color:'red'}}>*</span></label>
                  </Row>
                  <span style={{color:'red'}}>{errors.employerName}</span>
                  <Row> 
                  &nbsp;&nbsp;&nbsp;<input className="detinput1" name="employerName" 
                  value={this.state.employerName}
                  onChange={this.handleChange}></input>
                  </Row>
                  <br/>
                  <Row>
                      <Col>         
                         <Row>
                         <label>Address<span style={{color:'red'}}>*</span></label>
                         </Row>
                         <span style={{color:'red'}}>{errors.address}</span>
                         <Row> 
                         &nbsp;&nbsp;&nbsp;<input className="detinput" name="address"
                         value={this.state.address}
                         onChange={this.handleChange}></input>
                         </Row>
                      </Col>
                 </Row>
                  <br/>
                  <Row>
                      <Col>
                         <Row>
                         <label>City<span style={{color:'red'}}>*</span></label>
                         </Row>
                         <span style={{color:'red'}}>{errors.city}</span>
                         <Row> 
                         &nbsp;&nbsp;&nbsp;<input className="detinput" name="city"
                         value={this.state.city}
                         onChange={this.handleChange}></input>
                         </Row>
                      </Col>      
                     <Col>
                         <Row>
                         <label>State<span style={{color:'red'}}>*</span></label>
                         </Row>
                         <span style={{color:'red'}}>{errors.state}</span>
                         
                         <Row> 
                         &nbsp;&nbsp;&nbsp;<input className="detinput" name="state" 
                         value={this.state.state}
                         onChange={this.handleChange}></input>
                         </Row>
                     </Col>
                 </Row>
                  <br/>
                  <Row>
                      <Col>
                         <Row>
                         <label>Country<span style={{color:'red'}}>*</span></label>
                         </Row>
                         <span style={{color:'red'}}>{errors.country}</span>
                         
                         <Row> 
                         &nbsp;&nbsp;&nbsp;<CountryDropdown className="detinput"
                             value={this.state.country}
                             onChange={(val) => this.handleChangeCountry(val)}      
                         />
                         </Row>
                      </Col>
                      <Col>
                         <Row>
                         <label>zipcode<span style={{color:'red'}}>*</span></label>
                         </Row>
                         <span style={{color:'red'}}> {errors.zipcode}</span>
                         
                         <Row> 
                         &nbsp;&nbsp;&nbsp;<input className="detinput" name="zipcode" 
                         value={this.state.zipcode}
                         onChange={this.handleChange}></input>
                         </Row>
                       </Col>  
                     </Row>  
                  <br/>
                  </Col>
                  
                  <Button onClick = {this.handleEmpDetails}>Save</Button>
             </div>
         )      
    }
      return (
        <div>
             <div className="main-div1">
             <Row>   
                  <Col>   
                    <img
                        src={logo}
                        alt=""
                        width="150"
                        height="100"
                        class="d-inline-block align-text-top"
                    />
                  </Col>
                  <Col> 
                    <h2 style={{marginLeft:"-30%"}}>Welcome to Bring It Home for Service Providers!</h2>
                  </Col>
              </Row>      
             </div>
            <div className="main-div1">
            <div className = "details">   
            <h4>Employer Details</h4><span className="editdetails"/>           
            </div>   
            {empdetailscol}
            </div>
            <div>
           
      </div>   
    </div>
      );
    }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})
// function mapDispatchToProps(dispatch) {
//   return {
//       setEmpId: employerId => dispatch(setEmpId(employerId))
//   };
// }

export default connect(mapStateToProps)(FreelancerProfile);

