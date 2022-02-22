import {Line} from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'


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
      data: [],
      showLine: true,
      tension:0,
    }
  ]
}
  

 
//   const config = {
//     legend:{
//       display:true,
//      position: "right"
//     }
// }
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
const getNumOfLessons= (i_country, i_school, i_camp,records)=>{
          
    

    let dataToDisplay= noData
    
    //   dataToDisplay.splice(index, 1);
    //   dataToDisplay.pop(); 
    // }
    console.log("############### dataToDisplay in the beginning",dataToDisplay)
    let filtered_recored =[]
    console.log("camp_state",i_camp)
    console.log("school_state",i_school)
    console.log("country_state",i_country)
    // const records= Object.entries(i_records)
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
      filtered_recored= records[0].filter((record) => (
      ( ( record.camp===(i_camp[0]))&&(record.country===(i_country[0])))
     
       ))
       if(filtered_recored===[])
       {
         return noData
       }
       console.log("filtered_recored",filtered_recored)

       const matchedSchools= getUniqueSchool(filtered_recored)
       let orderedResult=[]
      //  let dataToDisplay_temp=[]
       matchedSchools.forEach(function (mSchool, index) {
           /*ordere the list per school to represent each school with a chart*/
        orderedResult =[...orderedResult,filtered_recored.filter((record)=>(
          record.school===(mSchool)
         ))] 
         console.log("index",index)

         console.log("orderedResult[index]",orderedResult[index])
          /*Fill the dataset array for each school entry*/
          const receivedData=(fillData(orderedResult[index],mSchool,false,index))
          console.log("receivedData",receivedData)
          dataToDisplay.datasets[index]=(receivedData.datasets[0]);
        //  dataToDisplay.push(fillData(orderedResult[index],mSchool,false,index))
        //  dataToDisplay=dataToDisplay_temp[0]
       });

      console.log("matchedSchools",matchedSchools)
      console.log("orderedResult",orderedResult)

    }
      else{
          console.log("recordsss",records)
          //clear data to display
          dataToDisplay=[]
        console.log("dataToDisplay after clear",dataToDisplay)

        filtered_recored= records[0].filter((record) => {
        
           return ( ( (record.camp)===i_camp[0])&&((record.country)===(i_country[0]))
            &&((record.school)===(i_school[0])))
        })
        if(filtered_recored===[])
        {
          return noData
        }
        console.log("filtered_recored",filtered_recored)

        // dataToDisplay.push(fillData(filtered_recored,i_school[0],false,0))
        dataToDisplay=(fillData(filtered_recored,i_school[0],false,0))
      }
      // fillData(filtered_recored,i_school,false,true)
      console.log("dataToDisplay",dataToDisplay)
      
      // config.data=dataToDisplay.datasets[0].data
    return dataToDisplay;
    
  
} 
const fillData=(filtered_recored,i_school,clear, loop)=>{
    console.log("filtered_recored",filtered_recored)
    let filledData=[noData]
    filledData.forEach((element,index) => {
      filledData.splice(index, 1);
    });
    filledData.push(noData)
      const lessons=filtered_recored.map((record)=>(record.lessons));
      const months=filtered_recored.map((record)=>(record.month));
      let totalLessons=0
      lessons.forEach(function (lesson, index) {
        totalLessons += lesson;
      })
      const lessonDataSet= {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","sep","Nov","Dec"],
        datasets: [
          {
            data: lessons,
            label: `${totalLessons} lessons in ${i_school}`,
            borderColor: "#3333ff",
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
          }
        ]
    };
  
      
      console.log("totalLessons",totalLessons)
      if (clear===true)
      {
        filledData=noData
        return fillData;
      }
      // if(showAllSchools===true)
      // {
      //   filledData.datasets = [...filledData.datasets,lessonDataSet] ;
      //   filledData.datasets[0].label = `${totalLessons} lessons in ${i_school[0]}`;


      // }
      // else{
        filledData=lessonDataSet ;
        filledData.labels=months
        // filledData.datasets[loop] = lessonDataSet;
       // filledData.datasets[loop].label = `${totalLessons} lessons in ${i_school}`;
      // }
      // Object.assign({},(filledData.datasets.push(lessonDataSet))) ;
      //labels not correct to be checked how to fix
    //   filledData.labels=[...filledData.labels,months]
    // filledData.labels=[...months]
    // filledData.labels=months
      console.log("lessons",lessons)
      console.log("filledData",filledData)
      return filledData
  
  }
export default function ChartDrawer() {
  // const [ chartDataState, setChartData ] = useState(false);
    const { camp, country, school,records,chart } = useSelector(state => ({
        camp: state.camp,
        country: state.country,
        school: state.school,
        records: state.records,
        chart: state.chart
    }))
    const history = useHistory()
    let chartData = getNumOfLessons(country,school,camp,records)
    // chartData.push(getNumOfLessons(country,school,camp,records))
    console.log("camp",camp)
    console.log("school",school)
    console.log("country",country)
    console.log("record",records)

    const dispatch = useDispatch()
    // useEffect(()=>{
    //  const result=getNumOfLessons(country,school,camp,records)
    //  console.log("***********result",result)
    //  if(result)
    //  {
    //    console.log("inside state set")
    //   chartData=result[0]
    //   setChartData(result)
    //           console.log("chartDataState",chartDataState)
    
    //  }
     
    // },[country,camp,school])
    
    console.log("chartData",chartData)

   
    const handleClick=((dataIndex,datasetIndex)=>{

    if(chartData!=[]){
      const lessonsNum= chartData.datasets[datasetIndex].data[dataIndex]
      /*Extract school name from label to handle show all schools case*/
      const schoolLabel = chartData.datasets[datasetIndex].label;  
      const position = schoolLabel.search("in");
      const schoolName = schoolLabel.slice(position+3)
      /*Redirect to ChartDetail component*/
      history.push(`/chartDetails/${lessonsNum}/${schoolName}`)
    }
    

  })
  
    return (
        <div style={{height:"450px", width:"700px" }}>
          <p>Chart view</p>
            <Line 
            data={chartData}
            // options={config}
            options={{
              type: 'line',
              onClick: (e, element) => {
                if (element.length > 0) {
                  console.log("element",element)
                  let ind = element[0].index;
                  handleClick(ind,element[0].datasetIndex);
                }
              },
              responsive: true,
              tension:1,
              events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
              legend:{
                position: 'right'
               },
               position: 'right',
                title: {
                  display: true,
                  text: 'Line Chart'
                }
              }} 
            />
        </div>
      );

}