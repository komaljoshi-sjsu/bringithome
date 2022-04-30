import { Modal, Form, Button } from "react-bootstrap";
import backendServer from '../../webConfig';
import  '../../CSS/Booking.css'
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function Booking(props) {
    const[bookedDates, setbookedDates] = useState([]);
    const[bookedTimeSlots, setbookedTimeSlots] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(new Date(0, 0, 0, 9, 0));
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(0, 0, 0, 23, 0));
    const [endDate, setEndDate] = useState(new Date());
    // //dummy array for booked dates
    // const dates = [new Date('05-21-2022'), new Date('05-10-2022')];
    useEffect(()=> {
        let eDate = new Date();
        eDate.setMonth(eDate.getMonth() + 2);
        setEndDate(eDate);
        if(props.serviceid == null)
            return;
        axios.get(backendServer+'/api/getBookedSlots/'+props.serviceid+'/'+props.userid).then(res=> {
            if(res.status == 200) {
                
                let dateArr = res.data.date;
                let timeArr = res.data.dateTimeArr;
                let bDates = dateArr.map(d=> {
                    return new Date(d);
                });
                let bTimes = dateArr.map(t=> {
                    return new Date(0,0,0,parseInt(t[0]),parseInt(t[1]));
                });
                console.log('booked dates:',bDates);
                console.log('booked times:',timeArr);
                //setbookedDates(bDates);
                setbookedTimeSlots(timeArr);

            } else {
                alert(res.data);
            }
        }).catch(err=> {
            alert('Failed to fetch booked slots.');
            console.log('Failed to fetch booked slots:',err);
        })
    },[props.show]);
    
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
            userid: props.userid,
            serviceid: props.serviceid
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
    return (
        <Modal show={props.show} onHide={()=>props.setShowBooking(false)} className='booking-modal'>
            <Modal.Header>
                <Modal.Title><b>Payments</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DatePicker calendarIcon= "Calendar" placeholder="Service Date" showTimeSelect timeIntervals={60} selected={selectedDate} onChange={(date) => setSelectedDate(date)}  excludeTimes={bookedTimeSlots} maxDate={endDate} minDate = {startDate} dateFormat="MM/dd/yyyy  EE hh:mm a" maxTime={endTime} minTime = {startTime}/>
                {/* <DatePicker placeholder="Service Time" showTimeSelect showTimeSelectOnly timeIntervals={60} timeFormat="HH:mm" selected={selectedTime} onChange={(time) => setSelectedTime(time)} excludeTimes={bookedTimeSlots} maxTime={endTime} minTime = {startTime}/> */}
                <Form onSubmit={bookService} className="booking-form">
                    <Form.Group className="mb-3 spacer">
                        <Form.Control type="text" placeholder="Address" name="address" maxLength="60" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 spacer">
                        <Form.Control type="text" name = "phone" placeholder="Contact Number" pattern="[0-9]{10}" title="Please enter a 10 digit phone number"></Form.Control>                    
                    </Form.Group>
                    <Button bsStyle="primary" bsSize="large" block type="submit" className="spacer" className='book-button'>Pay ${props.price}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default Booking;