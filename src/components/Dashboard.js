
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Line} from 'react-chartjs-2';
import {setSelectedSchool} from '../actions/school'
import {setShowAllSchools} from '../actions/showAllSchools'

import {setSelectedCamp} from '../actions/camp'
import {setSelectedCountry} from '../actions/country'


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
import ChartDrawer from './ChartDrawer'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// const url=`http://localhost:8080/https://github.com/abdelrhman-arnos/analysis-fe-challenge/blob/master/data.json`;
const url=`https://cors-anywhere.herokuapp.com/https://github.com/abdelrhman-arnos/analysis-fe-challenge/blob/master/data.json`;



  
  
export default function Dashboard() {
    // const [ records, setRecords ] = useState([]);
    // const [ camp_state, setCamp ] = useState("");
    // const [ country_state, setCountry ] = useState("");
    // const [ school_state, setSchool ] = useState("");
    // const [ showAllSchools, setShowAllSchools ] = useState(false);

    const [ test, setTest ] = useState(false);

    const dispatch = useDispatch();
    const { camp, country, school,i_records,showAllSchools } = useSelector(state => ({
      camp: state.camp,
      cointry: state.country,
      school: state.school,
      i_records: state.records,
      school: state.showAllSchools
  }))
  console.log("camp_state",camp)
    console.log("school_state",school)
    console.log("country_state",country)
    console.log("i_records",i_records)
    console.log("showAllSchools",showAllSchools)
  const records=Object.entries(i_records)  
  const getUniqueCamp=()=>{
    let unique_camp=[]
    if((records.hasOwnProperty(0)===true))
    {
   unique_camp= records.map((record)=>{
    return record[1].camp
  })
  let temp_camp = new Set(unique_camp);
  unique_camp = [...temp_camp];
  console.log("unique camp",unique_camp)
}
  return unique_camp;
  }
  const getUniqueCountry=()=>{
    let unique_country=[]
    // if((records !== undefined)||((Object.keys(records).length!==1)|| (records.hasOwnProperty(1)===true)))
    if((records.hasOwnProperty(0)===true))

    {

     unique_country= records.map((record)=>{
      return record[1].country
    })
    let temp_country = new Set(unique_country);
    unique_country = [...temp_country];
    console.log("unique country",unique_country)
  }
  if(test===false)
  {
    setTest(true)

  }
 
    return unique_country;
    }

    const getUniqueSchool=(data)=>{
      let unique_school=[]
      if((records.hasOwnProperty(0)===true))
      {
      if(data!==[])
      {
        console.log("map record in unique school", data)
         unique_school= data.map((record,index)=>{
          // console.log("record.school",record)

          return record[1].school
        })
        let temp_school = new Set(unique_school);
        unique_school = [...temp_school];
        console.log("unique school",unique_school)
      }
    }
      return unique_school;

    }
      
     
      // const handleSetCountry= (e)=>{
      //   console.log("handle select",e.target.value)
      //   setCountry(e.target.value)
      // }
      // const handleSetCamp= (e)=>{
      //   console.log("handle select",e.target.value)
      //   setCamp(e.target.value)
      // }
      // const handleSetSchool= (e)=>{
      //   console.log("handle select",e.target.value)
      //   if(e.target.value==="Show_All")
      //   {
      //     setShowAllSchools(true)
      //   }
      //   else{
      //     setShowAllSchools(false)
      //   }
      //   setSchool(e.target.value)
      // }
 
  return (
    
          <div>
      {/* <select value={this.props.book.shelf} onChange={this.updateShelf.bind(this)}> */}
      <label>Select Country </label>
      <select  onChange={(e) => dispatch(setSelectedCountry(e.target.value))}>
        { getUniqueCountry().map((country,key)=>
            <option value={country}>{country}</option>
        )}
      </select>  
      <label>Select Camp </label>
      <select   onChange={(e) =>dispatch(setSelectedCamp(e.target.value))}>
        { getUniqueCamp().map((camp, key)=>
            <option value={camp}>{camp}</option>
        )}
      </select> 
      <label>Select School </label>
      {/*TODA: call a middleware to check on selected school value to set all scools in case of show all and dispatsh SET_SHOW_ALL_SCHOOL*/}
      <select   onChange={(e) =>dispatch(setSelectedSchool(e.target.value))}>
      <option value={"Show_All"} onClick={() => dispatch(setShowAllSchools())}>Show All</option>
        { getUniqueSchool(records).map((school,key)=>
            <option value={school}>{school}</option>
        )}

      </select>  

           
            <p>Chart view</p>
            <ChartDrawer/>
             {/* <Line
               data={getNumOfLessons(country_state,school_state,camp_state)}
              // data={data2}
              options={config2}
             />  */}
         </div>
    );
}
