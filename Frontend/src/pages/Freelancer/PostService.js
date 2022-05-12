//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,
  } from 'react-bootstrap';
  import logo from '../../images/logo_signin.png'
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import { connect } from "react-redux";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import FreelancerNavbar from './FreelancerNavbar'
const moment = extendMoment(Moment);

class PostService extends Component {
    constructor(props) {
      super(props);
      this.state = {
          // companyName: '',
          industry: '',
          jobTitle: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          jobMode: 'In-person',
          // jobType: 'Part-time',
          // salaryDetails: '',
          shortJobDescription: '',
          responsibilities: '',
          // qualifications: '',
          // loveJobRole: '',
          startDate:'',
          endDate:'',
          startTime:'',
          endTime:'',
          price:0,
          timeSlot:[],
          errors: {},
          successMsg: '',
          errorMsg: '',
      };
    }

    componentDidMount() {
      const empid = {
          empid: this.props.userInfo.id
      };
      console.log(empid) 
      const { history } = this.props;
      axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
      axios.post(`${backendServer}/api/getFreelancerDetails`,empid).then((response) => {
          console.log("Freelancer Details",response.data[0]);
          console.log(JSON.stringify(response.data).includes(JSON.stringify('email')));
          if(!JSON.stringify(response.data).includes(JSON.stringify('city'))){
            alert("Please update the profile details before posting a service.");
            history.push('/freelancerUpdateProfile');
          }else{
          this.setState({
            streetAddress:response.data[0].address,
            city:response.data[0].city,
            state:response.data[0].state,
            country: response.data[0].country,
            zipcode:response.data[0].zipcode
          });
        }
      });
  }

      handleChangeIndustry = (e) => {
        this.setState({
          industry: e.target.value,
        });
        this.setState({
          errors: {},
        });
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        this.setState({
          errors: {},
        });
      }
      handleDashBoard = (e)=>{
        e.preventDefault();
        const { history } = this.props;
		    history.push("/freelancerHome");
      }


      findFormErrors = () => {
        // const { companyName, jobTitle, industry, city, shortJobDescription, salaryDetails,
            // streetAddress, state, zipcode,country, jobMode, jobType, errors } = this.state;
            const { companyName, jobTitle, industry, shortJobDescription,
              jobMode, errors,startDate,endDate,startTime,endTime,price } = this.state;
        // if (!companyName || companyName === '') errors.companyName = 'Company Name cannot be blank!';
        if (!jobTitle || jobTitle === '') errors.jobTitle = 'Service name cannot be blank!';
        if (!industry || industry === '') errors.industry = 'Please select the service category!';
        // if (!city || city === '') errors.city = 'City cannot be blank!';
        if (!shortJobDescription || shortJobDescription === '') errors.shortJobDescription = 'Job Description cannot be blank!';
        // if (!salaryDetails || salaryDetails === '') errors.salaryDetails = 'Salary Details cannot be blank!';
        // if (!streetAddress || streetAddress === '') errors.streetAddress = 'Street Address cannot be blank!';
        // if (!state || state === '') errors.state = 'State cannot be blank!';
        // if (!zipcode || zipcode === '') errors.zipcode = 'Zip code cannot be blank!';
        // if (!country || country === '') errors.country = 'Please select the country!';
        if (!jobMode || jobMode === '') errors.jobMode = 'Please select the Job Mode!';
        // if (!jobType || jobType === '') errors.jobType = 'Please select the Job Type!';
        if (!startDate ||startDate === '') errors.startDate ='Please select Start Date!';
        if (!endDate ||endDate === '' || endDate < startDate)  errors.endDate ='Please select End Date and it should be greater than Start Date!';
        if (!startTime || startTime === '' ) errors.startTime ='Please select Start Time!';
        if (!endTime || endTime ==='' || startTime === endTime) errors.endTime = 'Start time and end time should be different! ';
        if (!price || price === 0) errors.price='Please select  Price for the service!';
        return errors;
      }

    handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrors();
        if (Object.keys(newErrors).length > 0) {
        this.setState({
            errors: newErrors,
        });
        } else {
            // To-DO : Get logged in company id
            const companyId = this.props.company.compid;
            const empid = this.props.userInfo.id;
            const companyName =this.props.userInfo.name;
            const { jobTitle, industry, shortJobDescription, salaryDetails, jobMode,responsibilities,streetAddress, state, zipcode,country,city, 
                  startDate,endDate,startTime,endTime,price,timeSlot} = this.state;
            const inputData = {
                companyId,
                empid,
                companyName,
                jobTitle,
                industry,
                salaryDetails,
                shortJobDescription,
                jobMode,
                // jobType,
                city,
                streetAddress,
                state,
                zipcode,
                country,
                responsibilities,
                // qualifications, 
                // loveJobRole,
                startDate,
                endDate,
                startTime,
                endTime,
                price,
                timeSlot:intervals(startTime,endTime),
                servicePostedDate : Date().toLocaleString(),
                servicePostedMonth : new Date().toLocaleString('en-US', { month: 'short' })
            };
           console.log("input data",inputData);
          //  const range = moment.range('2018-01-01 00:00', '2018-01-01 05:30');
          function intervals(start, end) {
            var start = moment(start, 'hh:mm a');
            var end = moment(end, 'hh:mm a');
            if(end < start && end != '12:00')
              end = end.add(1, 'd');
            var result = [];
            var current = moment(start);
            while (current <= end) {
              result.push(current.format('hh:mm a'));
              current.add(1, 'hour');
            }
            return result;
          }
        
          axios.defaults.headers.common['authorization'] = this.props.userInfo.token
          axios
            .post(`${backendServer}/api/postNewService`, inputData)
            .then((response) => {
              console.log("Response")
                console.log(response)
              if (response.status === 200) {
                
                this.setState({
                  successMsg: response.data,
                  companyName: '',
                  jobTitle: '',
                  industry: '',
                  salaryDetails: '',
                  shortJobDescription: '',
                  city: '',
                  streetAddress: '',
                  state: '',
                  zipcode: '',
                  country: '',
                  responsibilities:'',
                  // qualifications:'',
                  // loveJobRole:''
                  startDate:'',
                  endDate:'',
                  startTime:'',
                  endTime:'',
                  price:''
                });
              } else {
                this.setState({ errorMsg: response.data });
              }
            })
            .catch((err) => {
              this.setState({ errorMsg: "Internal Server Error!" });
            });

        }
    }
  
  
    render() {
        // const { companyName, jobTitle, industry, city, shortJobDescription, salaryDetails,
        //     streetAddress, state, zipcode,country, errors,successMsg, errorMsg,
        //     qualifications, responsibilities, loveJobRole } = this.state;
        const companyName = this.props.userInfo.name;
        // console.log("company",companyName)
            const {  jobTitle, industry, shortJobDescription, salaryDetails,errors,successMsg, errorMsg,
               responsibilities,startDate,endDate,startTime,endTime,price } = this.state;
            console.log(successMsg)
      return (
        <div>
            <FreelancerNavbar/>
            <Container style={{ display: 'flex', justifyContent: 'center'}}>
            <Card style={{ width: '50rem', margin: '0.8em'}}>
            <Card.Title>
               <Row><Col style={{marginLeft:"10%",marginTop:"10px"}}>   
               {/* <img
                src={logo}
                alt=""
                width="120"
                height="50"
                class="d-inline-block align-text-top"
              />  */}
              <p style={{marginLeft:"250px",marginTop:"20px",fontSize:"larger",color:"blue"}}>Post A Service</p><br/>
              <p style={{marginLeft:"170px",marginTop:"-30px"}}>Enter the available service details</p></Col></Row>
            </Card.Title>
            <Card.Body>   
            <div data-testid="msgDiv">
              {(successMsg !== undefined && successMsg != null)
                ? <h4 style={{ color: 'green' }}>{successMsg}</h4> : null}
              {(errorMsg !== undefined && errorMsg != null)
                ? <h4 style={{ color: 'brown' }}>{errorMsg}</h4> : null}
            </div>
            <Row>
              <Col><b style={{fontSize:"larger", color:"blue"}}>Basic Information:</b></Col>
              </Row><br/>
             <Row>
              <Col><b>Freelancer Name</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="companyName" type="text" placeholder="Enter your Company Name"
                  className="mr-sm-2" value={companyName} isInvalid={!!errors.companyName} disabled/>
                  <Form.Control.Feedback type="invalid">
                    { errors.companyName }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col><b>Service Name</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="jobTitle" type="text" className="mr-sm-2" onChange={this.handleChange} placeholder="Enter service name" value={jobTitle} isInvalid={!!errors.companyName}/>
                   <Form.Control.Feedback type="invalid">
                    { errors.jobTitle }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col><b>Service Category</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control as="select" value={industry} onChange={this.handleChangeIndustry} isInvalid={!!errors.industry}>
                    <option>Choose the service category</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Painting">Painting</option>
                    <option value="Repair">Repair</option>
                    <option value="Salon">Salon </option>
                    <option value="Therapy">Therapy</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    { errors.industry }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col><b>Select Service Mode</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check inline value="In-person" label="In-person" name="jobMode" type="radio" id="In-person" onChange={this.handleChange} isInvalid={!!errors.jobMode} defaultChecked/>
                  <Form.Check inline value="Remote" label="Video Consultation" name="jobMode" type="radio" id="Remote" onChange={this.handleChange} isInvalid={!!errors.jobMode} />
                  <Form.Control.Feedback type="invalid">
                    { errors.jobMode }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {/* <Row>
            <Col><b>Select Job Type</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check required inline value="Part-time" label="Part-time" name="jobType" type="radio" id="Part-time" onChange={this.handleChange} isInvalid={!!errors.jobType} defaultChecked/>
                  <Form.Check required inline value="Full-time" label="Full-time" name="jobType" type="radio" id="Full-time" onChange={this.handleChange} isInvalid={!!errors.jobType}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.jobType }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row> */}
            <Row>
                <Col><b>Enter Service Description</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="shortJobDescription" as="textarea" rows={5} className="mr-sm-2" onChange={this.handleChange} value={shortJobDescription} isInvalid={!!errors.shortJobDescription}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.shortJobDescription }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Responsibilities</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="responsibilities" as="textarea" rows={5} className="mr-sm-2" onChange={this.handleChange} value={responsibilities} isInvalid={!!errors.responsibilities}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.responsibilities }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    {/* <Row>
                <Col><b>Qualifications</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="qualifications" as="textarea" rows={5} className="mr-sm-2" onChange={this.handleChange} value={qualifications} isInvalid={!!errors.qualifications}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.qualifications }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row> */}
                <Row>
              <Col><b style={{fontSize:"larger", color:"blue"}}>Availability Details:</b></Col>
              </Row><br/>
              <Row>
              <Col><b>Start Date </b></Col>
              <Col><b>End Date </b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="startDate" type="date" className="mr-sm-2" onChange={this.handleChange}  value={startDate} isInvalid={!!errors.startDate}/>
                <Form.Control.Feedback type="invalid">
                    { errors.startDate }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="endDate" type="date" className="mr-sm-2" onChange={this.handleChange}  value={endDate} isInvalid={!!errors.endDate}/>
                <Form.Control.Feedback type="invalid">
                    { errors.endDate }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Start Time</b></Col>
              <Col><b>End Time</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="startTime" type="time" className="mr-sm-2" onChange={this.handleChange} value={startTime} isInvalid={!!errors.startTime}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.startTime }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="endTime" type="time" className="mr-sm-2" onChange={this.handleChange}  value={salaryDetails} isInvalid={!!errors.endTime}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.endTime }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
                    {/* <Row>
                <Col><b>Reasons for loving this job</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="loveJobRole" as="textarea" rows={5} className="mr-sm-2" onChange={this.handleChange} value={loveJobRole} isInvalid={!!errors.loveJobRole}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.loveJobRole }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row> */}
                    <Row>
              <Col><b style={{fontSize:"larger", color:"blue"}}>Price(in $):</b></Col>
              </Row><br/>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="price" type="number" min="0" className="mr-sm-2" onChange={this.handleChange} placeholder="Enter Price Value" value={price} isInvalid={!!errors.price}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.price }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              {/* <Row>
              <Col><b style={{fontSize:"larger", color:"blue"}}> Address Details:</b></Col>
              </Row><br/>
            <Row>
              <Col><b>Street Address</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="streetAddress" placeholder="Enter Street Address" type="text" className="mr-sm-2" onChange={this.handleChange} value={streetAddress} isInvalid={!!errors.streetAddress} />
                  <Form.Control.Feedback type="invalid">
                    { errors.streetAddress }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>City</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="city" type="text" placeholder="Enter City" className="mr-sm-2" onChange={this.handleChange} value={city} isInvalid={!!errors.city} />
                  <Form.Control.Feedback type="invalid">
                    { errors.city }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>State</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="state" type="text" placeholder="Enter State" className="mr-sm-2" onChange={this.handleChange} value={state} isInvalid={!!errors.state} />
                  <Form.Control.Feedback type="invalid">
                    { errors.state }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>Zip</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="zipcode" type="number" placeholder="Enter Zipcode" className="mr-sm-2" onChange={this.handleChange} value={zipcode} isInvalid={!!errors.zipcode} />
                  <Form.Control.Feedback type="invalid">
                    { errors.zipcode }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>Country</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <CountryDropdown
                    value={country}
                    onChange={(val) => this.handleChangeCountry(val)}
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    { errors.country }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row> */}
            <Row>
              <Col colSpan="2" style={{marginLeft:"40%"}}>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Post Service
                </Button>
                {/* <Button variant="primary" type="submit" onClick={this.handleDashBoard} style={{marginLeft:"50px"}}>
                  DashBoard
                </Button> */}
              </Col>
              </Row>
              {/* <br/>
              <Row>
              <Col colSpan="2">
                <Button variant="primary" type="submit" onClick={this.handleDashBoard}>
                  DashBoard
                </Button>
              </Col>
              </Row> */}
              </Card.Body>
              </Card>
              </Container>
        </div>
      );
    }
  }
  //export default PostJob;
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(PostService);