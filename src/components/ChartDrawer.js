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
    data:data2,
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
        return record[1].school
      })
      let temp_school = new Set(unique_school);
      unique_school = [...temp_school];
      console.log("unique school",unique_school)
    }
    return unique_school;

  }
const getNumOfLessons= (i_country, i_school, i_camp,i_records)=>{
          
    

    let dataToDisplay=[]
    let filtered_recored =[]
    console.log("camp_state",i_camp)
    console.log("school_state",i_school)
    console.log("country_state",i_country)
    const records= Object.entries(i_records)
    // if((i_country === ("" || "undefined"))  || (i_camp===("" || "undefined")) )
    if((i_country === null)  || (i_camp=== null) || (i_school === null))

    {
      console.log("empty state")
      return noData
    }
    console.log("camp_state",i_camp)
    console.log("school_state",i_school)
    console.log("country_state",i_country)
    console.log("records",records)
      if(i_school[0]==="Show_All") 
      {
        filtered_recored= records.filter((record) => (
        ( ( record[1].camp===(i_camp[0]))&&(record[1].country===(i_country[0])))
       
         ))
         console.log("filtered_recored",filtered_recored)

         const matchedSchools= getUniqueSchool(filtered_recored)
         let orderedResult=[]
         matchedSchools.forEach(function (mSchool, index) {
             /*ordere the list per school to represent each school with a chart*/
          orderedResult =[...orderedResult,filtered_recored.filter((record)=>(
            record[1].school===(mSchool)
           ))] 
           dataToDisplay.push(fillData(orderedResult[index],mSchool,true))
         });
        
        console.log("matchedSchools",matchedSchools)
        console.log("orderedResult",orderedResult)

      }
    //   else if(i_school==="")
    //   {

    //   }
      else{
          console.log("recordsss",records)

        filtered_recored= records.filter((record) => {
        //     console.log("record[1].camp",record[1].camp)
        //     console.log("i_camp",i_camp[0])
        //     console.log("( record[1].camp.includes(i_camp))",( record[1].camp==(i_camp[0])))
           return ( ( (record[1].camp)===i_camp[0])&&((record[1].country)===(i_country[0]))
            &&((record[1].school)===(i_school[0])))

        //   ( ( record[1].camp.includes(i_camp[0]))&&(record[1].country.includes(i_country[0]))
        //   &&(record[1].school.includes(i_school[0])))
         console.log("( record[1].camp.includes(i_camp))",( record[1].camp.includes(i_camp)))
         console.log("record[1].camp",record[1].camp)
         console.log("i_camp",i_camp)
        })
        
        console.log("filtered_recored",filtered_recored)

           dataToDisplay.push(fillData(filtered_recored,i_school,false))
      }
      console.log("dataToDisplay",dataToDisplay)
      config2.data=dataToDisplay[0].datasets.data
    return dataToDisplay[0];
    
  
} 
const fillData=(filtered_recored,i_school,showAllSchools)=>{
    console.log("filtered_recored",filtered_recored)
    let filledData=data2
      const lessons=filtered_recored.map((record)=>(record[1].lessons));
      const months=filtered_recored.map((record)=>(record[1].month));
      const lessonDataSet= 
        [{
          label: i_school,
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: lessons
        }]
      
      if(showAllSchools===true)
      {
        filledData.datasets = [...filledData.datasets,lessonDataSet] ;

      }
      else{
        filledData.datasets[0].data = [...lessons];
        filledData.datasets[0].label = i_school[0];
      }
      // Object.assign({},(filledData.datasets.push(lessonDataSet))) ;
      //labels not correct to be checked how to fix
    //   filledData.labels=[...filledData.labels,months]
    filledData.labels=[...months]
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
        showAllSchools: state.showAllSchools
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
               data={getNumOfLessons(country,school,camp,records)}
              // data={data2}
              options={config2}
             /> 
        </div>
      );

}