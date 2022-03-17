'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')

router.get('/findSalaries', (req, res) => {
  try {
    conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job group by jobTitle;', async function (err, results) {
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})


// router.get('/findSalByTitle', (req, res) => {
//   const query ="select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job where lower(jobTitle) like lower('S%')  group by jobTitle order by salaryDetails  DESC limit 5 ;";
//   const subquery1 ='select round(avg(Review.rating),2) as rating,count(Review.reviewId) as revCnt from Review where Review.companyId=?;';
//   const subquery2='select count(SalaryReview.companyId) as salRevCnt from SalaryReview where SalaryReview.companyId=?;';
  
//   try {
//     var finalResult = [];
//     var reviewData;
//     var salaryReviewData;
//     conn.query(query, function (err, results) {
//       if (results.length <= 0) {
//         console.log('Not found')
//         res.status(400).send('Job details not found')
//       }
//       if (err) {
//         console.log('error')
//          res.status(400).send('Error ocurred')
//       }
//       if(results.length > 0) {
//         (async (results) => {results.forEach(dataObj => {
//           // conn.query(subquery1,[1],  function (err, rows1) {
//         let partialResult = await getReviewData(subquery1, dataObj.companyId, function(err,data){
//               if (err) {
//                   // error handling code goes here
//                   console.log("ERROR : ",err);            
//               } else {            
//                   // code to execute on data retrieval
//                   console.log("result from db is : ",data);
//                   reviewData = data[0];
//                   getSalaryReviewData(subquery2, dataObj.companyId, function(err,data2){
//                     if (err) {
//                         // error handling code goes here
//                         console.log("ERROR : ",err);            
//                     } else {            
//                         // code to execute on data retrieval
//                         console.log("result from db is : ",data2);
//                         salaryReviewData = data2[0];
//                         return Object.assign({},...dataObj,...reviewData,...salaryReviewData);
//                         // console.log("inside", finalResult, "time: ", Date.now());
//                     }
//                   });
//               }
//             });
//             finalResult.push(partialResult);
//             // finalResult.push(Object.assign({},...results,...rows1,...rows2));
//             console.log("finalresult",finalResult, "time: ", Date.now());
//           // conn.query(subquery1,[dataObj.companyId],  async function (err, rows1) {
//           //   if (err) {
//           //     console.log('error')
//           //     // res.status(400).send('Error ocurred')
//           //   }  
//           //   // conn.query(subquery2,[1],  function (err, rows2) {
//           // conn.query(subquery2,[dataObj.companyId],  function (err, rows2) {
//           //     if (err) {
//           //       console.log('error')
//           //     //  res.status(400).send('Error ocurred')
//           //     }
//           //     // console.log("object",Object.assign(...results,...rows1,...rows2));
//           //     finalResult.push(Object.assign({},...results,...rows1,...rows2));
//           //     console.log("finalresult",finalResult, "time: ", Date.now());
//           //   })  
//           // })
//           // console.log("finalresult",finalResult);
//         });})();
//         console.log(finalResult, "time: ", Date.now());
//         return res.status(200).send(finalResult);
//       }
//     })
//   } catch (error) {
//     console.log('ERROR!' + error)
//     return res.status(400).send('Error while fetching details')
//   }
// })

// function getReviewData(query, companyId, callback) {
//   conn.query(query,[companyId], function (err, rows1) {
//     if (err) {
//       callback(err, null);
//       // res.status(400).send('Error ocurred')
//     } else {
//     callback(null, rows1);
//     }  
//   })
// }

// function getSalaryReviewData(query, companyId) {
//   conn.query(query,[companyId],  function (err, rows2) {
//     if (err) {
//       console.log('error')
//     }
//     // console.log("object",Object.assign(...results,...rows1,...rows2));
//     // finalResult.push(Object.assign({},...results,...rows1,...rows2));
//     // console.log("finalresult",finalResult, "time: ", Date.now());

//     return rows2;
//   }) 
// }




router.get('/findSalByTitle', (req, res) => {
    var finalResult = [];
  const query ="select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job where lower(jobTitle) like lower('S%')  group by jobTitle order by salaryDetails  DESC limit 5 ;";
  const subquery1 ='select round(avg(Review.rating),2) as rating,count(Review.reviewId) as revCnt from Review where Review.companyId=?;';
  const subquery2='select count(SalaryReview.companyId) as salRevCnt from SalaryReview where SalaryReview.companyId=?;'; 
  // try {
    // conn.query(query, async (err, results)=> {
      // if (results.length <= 0) {
      //   console.log('Not found')
      //   res.status(400).send('Job details not found')
      // }
  try {
    conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job where lower(jobTitle) like lower("S%")  group by jobTitle order by salaryDetails  DESC limit 5 ;', async function (err, results) {
      if (err) {
        console.log('error')
         res.status(400).send('Error ocurred')
      }
      if(results.length > 0) {
        // await results.forEach(dataObj => {
          // conn.query(subquery1,[dataObj.companyId],  async function(err, rows1) {
            conn.query(subquery1,[results[0].companyId],  async function(err, rows1) {
            if (err) {
              console.log('error')
              // res.status(400).send('Error ocurred')
            }  
            // conn.query(subquery2,[1],  function (err, rows2) {
            //  conn.query(subquery2,[dataObj.companyId],  async function (err, rows2) {
              conn.query(subquery2,[results[0].companyId],  async function (err, rows2) {
              if (err) {
                console.log('error')
              //  res.status(400).send('Error ocurred')
              }
              // await finalResult.push(Object.assign({},...results,...rows1,...rows2));
              console.log("finalresultone",finalResult);
              return res.status(200).send([Object.assign({},...results,...rows1,...rows2)]);

            }) 
          })
        // });
        console.log("finalresult",finalResult);
        // return res.status(200).send(finalResult);
      }
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})

module.exports = router