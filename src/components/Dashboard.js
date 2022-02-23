import {setSelectedSchool} from "../actions/school";
import {setSelectedCamp} from "../actions/camp";
import {setSelectedCountry} from "../actions/country";


import { useSelector, useDispatch } from "react-redux";
import React from "react";
import ChartDrawer from "./ChartDrawer";
// const url=`https://cors-anywhere.herokuapp.com/https://github.com/abdelrhman-arnos/analysis-fe-challenge/blob/master/data.json`;
export default function Dashboard() {

  const dispatch = useDispatch();
  const { camp, country, school,records } = useSelector(state => ({
    camp: state.camp,
    cointry: state.country,
    school: state.school,
    records: state.records,
  }));
  console.log("camp_state",camp);
  console.log("school_state",school);
  console.log("country_state",country);
  console.log("records",records);
  /*function to get camp names without repeating to display them on select list*/
  const getUniqueCamp=()=>{
    let unique_camp=[];
    // eslint-disable-next-line no-prototype-builtins
    if((records.hasOwnProperty(0)===true))
    {
      unique_camp= records[0].map((record)=>{
        return record.camp;
      });
      let temp_camp = new Set(unique_camp);
      unique_camp = [...temp_camp];
    }
    return unique_camp;
  };
  const getUniqueCountry=()=>{
    let unique_country=[];
    if((records.hasOwnProperty(0)===true))
    {

      unique_country= records[0].map((record)=>{
        return record.country;
      });
      let temp_country = new Set(unique_country);
      unique_country = [...temp_country];
    }
 
    return unique_country;
  };

  const getUniqueSchool=()=>{
    let unique_school=[];
    if((records.hasOwnProperty(0)===true))
    {
      unique_school= records[0].map((record)=>{
        return record.school;
      });
      let temp_school = new Set(unique_school);
      unique_school = [...temp_school];
    }
    return unique_school;
  };
  return (
    
    <div className='container'>

      <label>Select Country </label>
      <select placeholder='Select' onChange={(e) => dispatch(setSelectedCountry(e.target.value))}>
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
      <select   onChange={(e) =>dispatch(setSelectedSchool(e.target.value))}>
        <option value={"Select"} hidden >Select</option>
        <option value={"Show_All"} >Show All</option>
        { getUniqueSchool().map((school,key)=>
          <option key= {key} value={school}>{school}</option>
        )}
      </select>  

      <ChartDrawer />
    </div>
  );
}