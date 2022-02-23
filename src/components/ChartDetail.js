import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


export default function ChartDetail() {
  const { camp, country } = useSelector(state => ({
    camp: state.camp,
    country: state.country,
  }));
  const {schoolName} = useParams();
  const { lessonsNum } = useParams();
  console.log("lessonsNum",lessonsNum);
  return (
    <div className='camp' >
      <table id="entry_data" style={{border:"solid", width:"200px"}}>
        <tbody onChange={(event) =>this.setInputState(event)} style={{border:"solid", width:"200px"}}>
          <tr>
            <td>
              <label>Camp Name:</label>
            </td>
            <td>
              <label>{camp[0]}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Country Name:</label>
            </td>
            <td>
              <label>{country[0]}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>School Name:</label>
            </td>
            <td>
              <label>{schoolName}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Num of Lessons:</label>
            </td>
            <td>
              <label>{lessonsNum}</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>   
  );
} 

