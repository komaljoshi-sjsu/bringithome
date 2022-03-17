import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Bar} from "react-chartjs-2";

const CompanyStatistics = (props) => {
  const [show, setShow] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [yearArray, setYearArray] = useState([]);
  const [hiredArray, setHiredArray] = useState([]);
  const [rejectArray, setRejectArray] = useState([]);

  useEffect(() => {
    getStatistics();
  }, [show]);
  
  const getStatistics = async () =>{
    const statDtls = await axios("/companyJobStatistics", {params:{data:companyId}});
    //console.log(statDtls)
    setHiredArray(statDtls.data.hired.map(function (el) { return el.count; }));
    setRejectArray(statDtls.data.rejected.map(function (el) { return el.count; }));
    setYearArray(statDtls.data.hired.map(function (el) { return el.year; }));
  };

  const handleShow = () => {
    setShow(true)
  };

  const handleClose = () => setShow(false);

  const options={
    responsive: true,
    legend: {
        display: false,
    },
    type:'bar',
  }

  const data = {
    labels: yearArray,
    datasets: [
      {
        label: 'Hired',
        backgroundColor: 'rgba(0,255,0)',
        borderWidth: 1,
        data: hiredArray
      },
      {
        label: 'Rejected',
        backgroundColor: 'rgba(255,0,0)',
        borderWidth: 1,
        data: rejectArray
      }
    ]
}

  return (
    <div class="modal-header border-0">
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "6.25rem"}}
      >
        Job Related Statistics
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(hiredArray.length > 0 || rejectArray.length > 0) && <Bar
          data={data}
          width={null}
          height={null}
          options={options}
        />}
        {(hiredArray.length <= 0 || rejectArray.length <= 0) && <p>No data found</p>}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyStatistics;
