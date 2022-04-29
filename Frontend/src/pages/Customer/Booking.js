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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // //dummy array for booked dates
    // const dates = [new Date('05-21-2022'), new Date('05-10-2022')];
    useEffect(()=> {
        let eDate = new Date();
        eDate.setMonth(eDate.getMonth() + 2);
        setEndDate(eDate);
        // axios.get(backendServer+'/api/getBookedSlots/'+props.serviceid+'/'+props.userid).then(res=> {
        //     if(res.status == 200) {
        //         setbookedDates(res.data.date);
        //         setbookedTimeSlots(res.data.time);

        //     } else {
        //         alert(res.data);
        //     }
        // }).catch(err=> {
        //     alert('Failed to fetch booked slots.');
        //     console.log('Failed to fetch booked slots:',err);
        // })
    },[]);
    
    const bookService = (e)=> {
        e.preventDefault()
        const formData = new FormData(e.target)
        const address = formData.get('address')
        const phone = formData.get('phone');
        axios.post(backendServer+'/api/bookService', {
            address: address,
            phone: phone,
            date: startDate
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
                <DatePicker placeholder="Service Date" autofocus={true} selected={selectedDate} onChange={(date) => setSelectedDate(date)} excludeDates={bookedDates} maxDate={endDate} minDate = {startDate}/>
                <Form onSubmit={bookService} className="booking-form">
                    <Form.Group className="mb-3 spacer">
                        <Form.Control type="text" placeholder="Address" name="address" maxLength="60" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 spacer">
                        <Form.Control type="text" name = "phone" placeholder="Contact Number" pattern="[0-9]{10}" title="Please enter a 10 digit phone number"></Form.Control>                    
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