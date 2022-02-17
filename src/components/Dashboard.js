
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Line} from 'react-chartjs-2';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// const url=`http://localhost:8080/https://github.com/abdelrhman-arnos/analysis-fe-challenge/blob/master/data.json`;
const url=`https://cors-anywhere.herokuapp.com/https://github.com/abdelrhman-arnos/analysis-fe-challenge/blob/master/data.json`;



  
  
export default function Dashboard() {
    const [ records, setRecords ] = useState([]);
    // const [ showDetails, setShowDetails ] = useState(false);
    const getData=()=>{
        fetch('data.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            setRecords(myJson)
            console.log(myJson);
          });
      }
      console.log("school",records);

      useEffect(()=>{
        getData()
      },[])

      //Chart part
      // const ctx = document.getElementById('myChart').getContext('2d');

    //   const myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    const data2 = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    }
  
    const config2 = {
      type: 'line',
      data: data2,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
    };
  
  // const SavingsChart = () => {
  //     return (
  //           <Line
  //             data={data}
  //             options={config}
  //           />
  //       );
  // };
  
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  let unique=[]
  let camp= records.map((record)=>{
    console.log("camp",record.camp)

unique=[...unique,record.camp]

  })
  let mySet = new Set(unique);
  unique = [...mySet];
console.log("unique",unique)

  const deduped = Array.from(new Set(records));
// console.log("camp",camp)
  // let unique=[]
  return (
    
          <div>
      {/* <select value={this.props.book.shelf} onChange={this.updateShelf.bind(this)}> */}
     <label>Camp </label>
      <select  value={unique}>
       { unique.map((camp)=>
                   <option value={camp}>{camp}</option>

       )}
            {/* <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option> */}
            </select>   
            <p>Chart view</p>
            <Line
              data={data2}
              options={config2}
            />
         </div>
    );
}

// function mapStateToProps( {authedUser} ){
//     return { 
//       // authedUser:authedUser?authedUser[0]:null
//     };
//   }
// export default withRouter(connect(mapStateToProps)(Dashboard))
// export default (Dashboard)