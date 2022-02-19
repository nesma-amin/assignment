
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
    const [ camp_state, setCamp ] = useState("");
    const [ country_state, setCountry ] = useState("");
    const [ school_state, setSchool ] = useState("");
    const [ showAllSchools, setShowAllSchools ] = useState(false);

    const [ showDetails, setShowDetails ] = useState(false);
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
        getData();
        getNumOfLessons(country_state,school_state,camp_state)
      },[])

      //Chart part
  
    let data2 = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'July', 'Aug','sep','oct','Nov','Dec'],
      datasets: [
        {
          label: school_state,
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    }
  
    let noData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'No Data Selected',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    }
    let  options = {
      scales: {
        yAxes: [
          {
            type: 'line',
            display: true,
            position: 'left',
            id: 'y-axis-1',
          },
          {
            type: 'line',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              drawOnArea: false,
            },
          },
        ],
      },
    };
    const config2 = {
      type: 'line',
      data: data2,
      options: {
        responsive: true,
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        plugins: [{
          id: 'myEventCatcher',
          beforeEvent(chart, args, pluginOptions) {
            const event = args.event;
            if (event.type === ('mouseout'|| 'mousemove')) {
              // process the event
            }
          }
        }],
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      
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
  const getUniqueCamp=()=>{
  let unique_camp= records.map((record)=>{
    return record.camp
  })
  let temp_camp = new Set(unique_camp);
  unique_camp = [...temp_camp];
  console.log("unique camp",unique_camp)
  return unique_camp;
  }
  const getUniqueCountry=()=>{
    let unique_country= records.map((record)=>{
      return record.country
    })
    let temp_country = new Set(unique_country);
    unique_country = [...temp_country];
    console.log("unique country",unique_country)
    return unique_country;
    }

    const getUniqueSchool=(data)=>{
      let unique_school=[]
      if(data!==[])
      {
        console.log("map record in unique school", data)
         unique_school= data.map((record)=>{
          return record.school
        })
        let temp_school = new Set(unique_school);
        unique_school = [...temp_school];
        console.log("unique school",unique_school)
      }
      return unique_school;

    }
      // const getChartAxisData=()=>{
      //   let unique_school=[]
      //   let school= records.map((record)=>{
      //     console.log("camp",record.school)
      //     unique_school=[...unique_school,record.school]
      //   })
      //   let temp_school = new Set(unique_school);
      //   unique_school = [...temp_school];
      //   console.log("unique",unique_school)
      //   return unique_school;
      //   }
        const getNumOfLessons= (i_country, i_school, i_camp)=>{
          
          console.log("camp_state",camp_state)
          console.log("school_state",school_state)
          console.log("country_state",country_state)
          let dataToDisplay=[]
          let filtered_recored =[]

          if((i_country === "")  && (i_camp==="") )
          {
            console.log("empty state")
            return noData
          }
          
            if(showAllSchools) 
            {
              filtered_recored= records.filter((record) => (
              ( ( record.camp.includes(i_camp))&&(record.country.includes(i_country)))
             
               ))
               console.log("filtered_recored",filtered_recored)

               const matchedSchools= getUniqueSchool(filtered_recored)
               let orderedResult=[]
               matchedSchools.forEach(function (mSchool, index) {
                orderedResult =[...orderedResult,filtered_recored.filter((record)=>(
                  record.school.includes(mSchool)
                 ))] 
                 dataToDisplay.push(fillData(orderedResult[index],mSchool))
               });
               let fixDataset= 
              
              console.log("matchedSchools",matchedSchools)
              console.log("orderedResult",orderedResult)

            }
            else{
              filtered_recored= records.filter((record) => (
                ( ( record.camp.includes(i_camp))&&(record.country.includes(i_country))&&(record.school.includes(i_school)))
               
                 ))
                 dataToDisplay.push(fillData(filtered_recored,i_school))
            }
            console.log("dataToDisplay",dataToDisplay)

          return dataToDisplay[0];
          
        
      } 
      const fillData=(filtered_recored,i_school)=>{
        console.log("filtered_recored",filtered_recored)
        let filledData=data2
          const lessons=filtered_recored.map((record)=>(record.lessons));
          const months=filtered_recored.map((record)=>(record.month));
          const lessonDataSet= 
            {
              label: i_school,
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: lessons
            }
          
          
          filledData.datasets = [...filledData.datasets,lessonDataSet] ;
          // Object.assign({},(filledData.datasets.push(lessonDataSet))) ;
          //labels not correct to be checked how to fix
          filledData.labels=[...filledData.labels,months]
          console.log("lessons",lessons)
          console.log("filledData",filledData)
          return filledData

      }
      const handleSetCountry= (e)=>{
        console.log("handle select",e.target.value)
        setCountry(e.target.value)
      }
      const handleSetCamp= (e)=>{
        console.log("handle select",e.target.value)
        setCamp(e.target.value)
      }
      const handleSetSchool= (e)=>{
        console.log("handle select",e.target.value)
        if(e.target.value==="Show_All")
        {
          setShowAllSchools(true)
        }
        else{
          setShowAllSchools(false)
        }
        setSchool(e.target.value)
      }
 
  return (
    
          <div>
      {/* <select value={this.props.book.shelf} onChange={this.updateShelf.bind(this)}> */}
      <label>Select Country </label>
      <select  onChange={(e) => handleSetCountry(e)}>
        { getUniqueCountry().map((country,key)=>
            <option value={country}>{country}</option>
        )}
      </select>  
      <label>Select Camp </label>
      <select   onChange={(e) =>handleSetCamp(e)}>
        { getUniqueCamp().map((camp, key)=>
            <option value={camp}>{camp}</option>
        )}
      </select> 
      <label>Select School </label>
      <select   onChange={(e) =>handleSetSchool(e)}>
      <option value={"Show_All"}>Show All</option>
        { getUniqueSchool(records).map((school,key)=>
            <option value={school}>{school}</option>
        )}

      </select>  

           
            <p>Chart view</p>
            {/* <ChartDrawer/> */}
             <Line
               data={getNumOfLessons(country_state,school_state,camp_state)}
              // data={data2}
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