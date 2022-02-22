import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'




export default function ChartDetail() {
    const [ selectedSchool, setSelectedSchool ] = useState([]);
    const schools=["sc1", "sc2", "sc3","sc4"]
    const lessonsNum=[20,10,15,30]
    const totalLessons =75
    const camp="Camp"
    // const { camp, country, school,records,showAllSchools } = useSelector(state => ({
    //     camp: state.camp,
    //     country: state.country,
    //     school: state.school,
    //     records: state.records,
    //     showAllSchools: state.showAllSchools
    // }))

  return (
    <dev className='camp' >
    <form style={{border:"solid", width:"200px"}}>
        <p>{`${totalLessons} lessons in ${camp[0]}`}</p>
    { schools.map((school, index)=>
     <div >
        <input type="checkbox"
        // value={`${lessonsNum[index]} lessons in ${school}`}
        value={school}
        name='lessonsPerSchools' 
        onChange={(e) =>setSelectedSchool(e.target.value)}
        />   
        <label>{`${lessonsNum[index]} lessons in ${school}`}</label>
        </div>    
    )}

   
<p>{selectedSchool}</p>
</form>
    </dev>
  )
} 

