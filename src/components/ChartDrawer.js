import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Line} from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
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
import school from '../reducer/school';

let data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'July', 'Aug','sep','oct','Nov','Dec'],
    datasets: [
      {
        label: "school",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  }
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
const getNumOfLessons= (i_country, i_school, i_camp,records,showAllSchools)=>{
          
    

    let dataToDisplay=[]
    let filtered_recored =[]
    console.log("camp_state",i_camp)
    console.log("school_state",i_school)
    console.log("country_state",i_country)
    // if((i_country === ("" || "undefined"))  || (i_camp===("" || "undefined")) )
    if((i_country === undefined)  || (i_camp=== null) || (i_school === undefined))

    {
      console.log("empty state")
      return noData
    }
    console.log("camp_state",i_camp)
    console.log("school_state",i_school)
    console.log("country_state",i_country)
    console.log("records",records)
    console.log("showAllSchools",showAllSchools)
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
      else if(school==="")
      {

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
export default function ChartDrawer() {
    const { camp, country, school,records,showAllSchools } = useSelector(state => ({
        camp: state.camp,
        country: state.country,
        school: state.school,
        records: state.records,
        school: state.showAllSchools
    }))
    console.log("camp",camp)
    console.log("school",school)
    console.log("country",country)
    console.log("record",records)

    const dispatch = useDispatch()
    
    return (
        <div>
          <p>Chart view</p>
            {/* <ChartDrawer/> */}
             <Line
               data={getNumOfLessons(country,school,camp,records,showAllSchools)}
              // data={data2}
              options={config2}
             /> 
        </div>
      );

}
