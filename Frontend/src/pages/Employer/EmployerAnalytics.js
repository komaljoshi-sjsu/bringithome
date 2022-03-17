import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import backendServer from '../../webConfig';
import EmployerNavbar from './EmployerNavbar'
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
    console.log("FE employerid: ", employerId);
   await axios
      .get(`${backendServer}/jobPosted`,{
        params: {
          employerId : employerId
        }
      })
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          jobCnt.push(parseInt(dataObj.countJobId));
          jobTitle.push(dataObj.jobTitle);
        }
        setChartOneData({
          labels: jobTitle,
          datasets: [
            {
              label: "job posted",
              data: jobCnt,
              backgroundColor: ["Orange"],
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
    let appApppliedCnt = [];
    let appRejectedCnt = [];
    let appAcceptedCnt = [];
    let compName =[];
    // let compAppliedName = [];
    // let compRejectedName = [];
    // let compAcceptedName = [];
   await axios
      .get(`${backendServer}/applicantsDetail`, {
        params: {
          employerId : employerId
        }
      })
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          if(dataObj.status.toLowerCase() === "submitted" || dataObj.status.toLowerCase() === "applied"){
            appApppliedCnt.push(parseInt(dataObj.countAppId));
            console.log(appApppliedCnt);
            // compAppliedName.push(dataObj.companyName);
          }
          else if(dataObj.status.toLowerCase() === "rejected"){
            appRejectedCnt.push(parseInt(dataObj.countAppId));
            console.log(appRejectedCnt);
            // compRejectedName.push(dataObj.companyName);
          }
          else if(dataObj.status.toLowerCase() === "hired"){
            appAcceptedCnt.push(parseInt(dataObj.countAppId));
            console.log(appAcceptedCnt);
            // compAcceptedName.push(dataObj.companyName);
          }
          else {
            appApppliedCnt.push(0);
            appRejectedCnt.push(0);
            appAcceptedCnt.push(0);
          }
         if(!compName.includes(dataObj.companyName)){
          compName.push(dataObj.companyName);
         } 
        }
        setChartTwoData({
          labels: compName,
          datasets: [
            {
              label: "applicants applied",
              data: appApppliedCnt,
              backgroundColor: ["Blue"],
              borderWidth: 4,
              barThickness:70
            },
            {
              label: "applicants accepted",
              data: appAcceptedCnt,
              backgroundColor: ["Cyan"],
              borderWidth: 4,
              barThickness:70
            },
            {
              label: "applicants rejected",
              data: appRejectedCnt,
              backgroundColor: ["rgb(255, 99, 132)"],
              borderWidth: 4,
              barThickness:70
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  useEffect(() => {
    barChartOne();
    barChartTwo();
  }, []);

  return (
    <div>        
       <EmployerNavbar/>
    <div className="App">
      <h1>JOB POSTED IN A YEAR</h1>
      <div>
        <Bar
          data={chartOneData}
          options={{
            responsive: true,
            title: { text: "POSTED JOBS", display: true },
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
      <h1>APPLICATIONS DETAILS</h1>
      <div>
        <Bar
          data={chartTwoData}
          options={{
            responsive: true,
            title: { text: "POSTED JOBS", display: true },
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