import {setSelectedSchool} from '../actions/school'
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
    const { camp, country, school,records,showAllSchools } = useSelector(state => ({
      camp: state.camp,
      cointry: state.country,
      school: state.school,
      records: state.records,
      school: state.showAllSchools
  }))
  console.log("camp_state",camp)
    console.log("school_state",school)
    console.log("country_state",country)
    console.log("i_records",records)
    console.log("showAllSchools",showAllSchools)
  // const records=Object.entries(i_records)  
  const getUniqueCamp=()=>{
    let unique_camp=[]
    if((records.hasOwnProperty(0)===true))
    {
   unique_camp= records[0].map((record)=>{
    return record.camp
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

     unique_country= records[0].map((record)=>{
      return record.country
    })
    let temp_country = new Set(unique_country);
    unique_country = [...temp_country];
    console.log("unique country",unique_country)
  }
 
    return unique_country;
    }

    const getUniqueSchool=()=>{
      let unique_school=[]
      if((records.hasOwnProperty(0)===true))
      {
        console.log("map record in unique school", records)
         unique_school= records[0].map((record,index)=>{
          // console.log("record.school",record.school)

          return record.school
        })
        let temp_school = new Set(unique_school);
        unique_school = [...temp_school];
        console.log("unique school",unique_school)
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
      <select placeholder='Select' onChange={(e) => dispatch(setSelectedCountry(e.target.value))}>
      {/* <option value="default" disabled hidden>select</option> */}
      <option value={"Select"} hidden >Select</option>


        { getUniqueCountry().map((country,key)=>
            <option key= {key}  value={country}>{country}</option>
        )}
      </select>  
      <label>Select Camp </label>
      <select  placeholder='select' onChange={(e) =>dispatch(setSelectedCamp(e.target.value))}>
      <option value={"Select"} hidden >Select</option>

        { getUniqueCamp().map((camp, key)=>
            <option key= {key} value={camp}>{camp}</option>
        )}
      </select> 
      <label>Select School </label>
      {/*TODA: call a middleware to check on selected school value to set all scools in case of show all and dispatsh SET_SHOW_ALL_SCHOOL*/}
      <select   onChange={(e) =>dispatch(setSelectedSchool(e.target.value))}>
      <option value={"Select"} hidden >Select</option>
      <option value={"Show_All"} >Show All</option>
        { getUniqueSchool().map((school,key)=>
            <option key= {key} value={school}>{school}</option>
        )}

      </select>  

           
            <ChartDrawer />
            {/* <CampInfo className='camp' style={{ display:"flex" }}/> */}
             {/* <Line
               data={getNumOfLessons(country_state,school_state,camp_state)}
              // data={data2}
              options={config2}
             />  */}
         </div>
    );
}