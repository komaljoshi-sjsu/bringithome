import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import backendServer from '../../webConfig';
import AdminNavbar from './AdminNavbar'

const AdminAnalytics = () => {
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
      }]
  });
  
  const barChartOne = async () => {
    let revCnt = [];
    let datePosted = [];
   await axios
      .get(`${backendServer}/revPerDay`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
            revCnt.push(parseInt(dataObj.revId));
            datePosted.push(dataObj.postedDate);
        }
        setChartOneData({
          labels: datePosted,
          datasets: [
            {
              label: "review posted",
              data: revCnt,
              backgroundColor: ["Orange"],
              borderWidth: 4,
              barThickness:100
            }]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  const barChartTwo = async () => {
    let revCnt = [];
    let name = [];
   await axios
      .get(`${backendServer}/acceptedRev`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
            revCnt.push(parseInt(dataObj.revId));
            name.push(dataObj.name);
        }
        setChartTwoData({
          labels: name,
          datasets: [
            {
              label: "review posted",
              data: revCnt,
              backgroundColor: ["Orange"],
              borderWidth: 4,
              barThickness:100
            }]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    barChartOne();
    barChartTwo();
  }, []);

  return (
    <div>        
       <AdminNavbar/>
    <div className="App">
      <h1>REVIEW POSTED PER DAY</h1>
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
      <h1>Top 5 job seekers based on total accepted reviews</h1>
      <div>
        <Line
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

export default AdminAnalytics;