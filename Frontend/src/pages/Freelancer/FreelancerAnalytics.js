import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import backendServer from '../../webConfig';
import FreelancerNavbar from './FreelancerNavbar'
import {useSelector} from 'react-redux';


const ReportEmployer = () => {
  const [chartOneData, setChartOneData] = useState({
    labels: [],
    datasets: [
      {
        data: []
      }]
  });

  const [chartTwoData, setChartTwoData] = useState({
    labels: [],
    datasets: [
      {
        data: []
      },
      {
          data: []
        },
        {
          data: []
        }]
  });

  const employerId = useSelector((state)=>state.userInfo.id);

  
  const barChartOne = async () => {
    let jobCnt = [];
    let jobTitle = [];
    // console.log("FE employerid: ", employerId);
   await axios
      .get(`${backendServer}/servicePosted`,{
        params: {
          employerId : employerId
        }
      })
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          jobCnt.push(parseInt(dataObj.postedServices));
          jobTitle.push(dataObj._id);
        }
        setChartOneData({
          labels: jobTitle,
          datasets: [
            {
              label: "services posted count",
              data: jobCnt,
              backgroundColor: ["Orange"],
              borderColor: ["Orange"],
              borderWidth: 4,
              barThickness:70
            }]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  const barChartTwo = async () => {
    let statusCnt = [];
    let status = [];
    // console.log("FE employerid: ", employerId);
   await axios
      .get(`${backendServer}/applicantsDetail`,{
        params: {
          employerId : employerId
        }
      })
      .then(res => {
        console.log("Two",res);
        for (const dataObj of res.data) {
          statusCnt.push(parseInt(dataObj.count));
          if(dataObj._id.toLowerCase() === "pending"){
            status.push("Applied");
          }else if(dataObj._id.toLowerCase() === "booked"){
            status.push("Accepted");
          }else if(dataObj._id.toLowerCase() === "cancelled"){
            status.push("Cancelled");
          }
        }
        setChartTwoData({
          labels: status,
          datasets: [
            {
              label: "count per ",
              data: statusCnt,
              backgroundColor: ["skyblue"],
              borderColor: ["Blue"],
              borderWidth: 4,
              barThickness:70
            }]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(statusCnt, empName);
  };

  // const barChartTwo = async () => {
  //   let appApppliedCnt = [];
  //   let appRejectedCnt = [];
  //   let appAcceptedCnt = [];
  //   let compName =[];
  //  await axios
  //     .get(`${backendServer}/applicantsDetail`, {
  //       params: {
  //         employerId : employerId
  //       }
  //     })
  //     .then(res => {
  //       // console.log("chart",res);
  //       compName.push("Applied");
  //       compName.push("Accepted");
  //       compName.push("Cancelled");
        
  //       for (const dataObj of res.data) {
  //         if(dataObj._id.toLowerCase() === "pending"){
  //           appApppliedCnt.push(parseInt(dataObj.count));
  //         }
  //         else if(dataObj._id.toLowerCase() === "booked"){
  //           appAcceptedCnt.push(parseInt(dataObj.count));
  //         }
  //         else if(dataObj._id.toLowerCase() === "cancelled"){
  //           appRejectedCnt.push(parseInt(dataObj.count));
  //         }else {
  //           appApppliedCnt.push(0);
  //           appRejectedCnt.push(0);
  //           appAcceptedCnt.push(0);
  //         }
  //       }
  //       // console.log("count",appApppliedCnt);
  //       // console.log("count2",appAcceptedCnt);
  //       // console.log("count3",appRejectedCnt);
  //       // console.log(compName)

  //      setChartTwoData({
  //         labels: compName,
  //         datasets: [
  //           {
  //             label: "customers applied",
  //             data: appApppliedCnt,
  //             backgroundColor: ["Blue"],
  //             borderWidth: 4,
  //             barThickness:70
  //           },
  //           {
  //             label: "booking accepted",
  //             data: appAcceptedCnt,
  //             backgroundColor: ["Cyan"],
  //             borderWidth: 4,
  //             barThickness:70
  //           },
  //           {
  //             label: "booking cancelled",
  //             data: appRejectedCnt,
  //             backgroundColor: ["rgb(255, 99, 132)"],
  //             borderWidth: 4,
  //             barThickness:70
  //           }
  //         ]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   console.log("data",chartTwoData);
  // };

  useEffect(() => {
    barChartOne();
    barChartTwo();
  }, []);

  return (
    <div>        
       <FreelancerNavbar/>
    <div className="App">
      <h1>SERVICES POSTED MONTHLY</h1>
      <div>
        <Line
          data={chartOneData}
          options={{
            responsive: true,
            title: { text: "POSTED SERVICES", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
      <br />
      <br />
      <h1>CUSTOMER BOOKING STATUS</h1>
      <div>
        <Bar
          data={chartTwoData}
          options={{
            responsive: true,
            title: { text: "BOOKING STATUS", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 500,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default ReportEmployer;