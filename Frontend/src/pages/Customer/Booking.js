import { Modal, Form, Button } from "react-bootstrap";
import backendServer from '../../webConfig';
import  '../../CSS/Booking.css'
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CustomerLoggedIn from "./CustomerLoggedIn";
import { useSelector } from "react-redux";
import moment from 'moment';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
function Booking(props) {
    const[dateMap, setDateMap] = useState({});
    const[traversed, settraversed] = useState(false);
    const[bookedTimeSlots, setbookedTimeSlots] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(new Date(0, 0, 0, 9, 0));
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(0, 0, 0, 23, 0));
    const [endDate, setEndDate] = useState(new Date());
    const token = useSelector((state) => state.userInfo.token);
    // //dummy array for booked dates
    // const dates = [new Date('05-21-2022'), new Date('05-10-2022')];
    useEffect(()=> {
        let eDate = new Date();
        eDate.setMonth(eDate.getMonth() + 2);
        setEndDate(eDate);
        if(props.location.state.serviceid == null)
            return;
        // axios.defaults.headers.common['authorization'] = token;
        axios.get(backendServer+'/api/getBookedSlots/'+props.location.state.serviceid+'/'+props.location.state.userid).then(res=> {
            if(res.status == 200) {
                let timeArr = res.data.dateTimeArr;
                let map = {}
                let bDates = timeArr.map(d=> {
                    
                    // let newDate =  new moment(new moment(d).format('MM/DD/YYYY  ddd hh:mm A'));
                    let newDate =  new Date(d);
                    let nd = setHours(setMinutes(newDate, newDate.getMinutes()), newDate.getHours());
                    map[newDate.toString()]='';
                    console.log(typeof(nd))
                    return nd
                });
                let isNew = true;
                for (const [key, value] of Object.entries(map)) {
                    if(dateMap[key]!=null) {
                        isNew = false;
                        break;
                    }
                }
                if(isNew) {
                    setDateMap(map);
                    setbookedTimeSlots(bDates);
                }
                
                
                console.log('booked dates:',bookedTimeSlots);
            } else {
                alert(res.data);
            }
        }).catch(err=> {
            //alert('Failed to fetch booked slots.');
            console.log('Failed to fetch booked slots:',err);
        })
    },[bookedTimeSlots]);
    
    const bookService = (e)=> {
        e.preventDefault()
        const formData = new FormData(e.target)
        const address = formData.get('address')
        const phone = formData.get('phone');
        axios.post(backendServer+'/api/bookService', {
            address: address,
            phone: phone,
            date: selectedDate.toLocaleDateString(),
            time: selectedDate.getHours()+":"+selectedDate.getMinutes(),
            userid: props.location.state.userid,
            serviceid: props.location.state.serviceid
        }).then(res => {
            if(res.status == 200) {
                alert("Successfully booked service");
            } else {
                alert(res.data);
            }
        }).catch(err => {
            alert("Failed to book service.");
            console.log(err);
        })
    }

    const setDate = (val)=> {
        if(dateMap[val]!=null) {
            alert('Sorry the time slot for this date is already booked')
            return
        }
        setSelectedDate(val);

    }
    return (
        <div className="container-fullwidth" >
            <CustomerLoggedIn></CustomerLoggedIn>

            <div style={{marginTop:'5%',marginRight:'auto',marginLeft:'auto',width:'50%'}}>
                <div className="row" style={{marginTop:'20px'}}>
                    <h3 style={{color:'darkgray'}}><b>Payments</b></h3>
                </div>
                
                <div className="row" style={{border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                Calender:<DatePicker placeholder="Service Date" showTimeSelect timeIntervals={60} selected={selectedDate}  onChange={(date) => setDate(date)}  maxDate={endDate} minDate = {startDate} dateFormat="MM/dd/yyyy  EE hh:mm a" maxTime={endTime} minTime = {startTime}/>
                    <Form onSubmit={bookService} className="booking-form">
                        {/* <Form.Group className="mb-3 spacer">
                            <Form.Label>

                            </Form.Label>
                        </Form.Group> */}
                        <Form.Group className="mb-3 spacer">
                            <Form.Control type="text" placeholder="Address" name="address" maxLength="60" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 spacer">
                            <Form.Control type="text" name = "phone" placeholder="Contact Number" pattern="[0-9]{10}" title="Please enter a 10 digit phone number"></Form.Control>                    
                        </Form.Group>
                        <Button bsStyle="primary" bsSize="large" block type="submit" className="spacer" className='book-button'>Pay ${props.location.state.price}</Button>
                    </Form>
                    <p></p>
                </div><br></br>
            </div>
                
        </div>
    )
}
export default Booking;