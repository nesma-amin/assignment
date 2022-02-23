import {Line} from "react-chartjs-2";
import { useSelector } from "react-redux";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

let noData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "No Data Selected",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [],
      showLine: true,
      tension:0,
    }
  ]
};
  


const getUniqueSchool=(data)=>{
  let unique_school=[];
  if(data!==[])
  {
    console.log("map record in unique school", data);
    unique_school= data.map((record)=>{
      return record.school;
    });
    let temp_school = new Set(unique_school);
    unique_school = [...temp_school];
    console.log("unique school",unique_school);
  }
  return unique_school;

};
const getColor=(()=>{
  let color=Math.random()+0x2792a5;
  return "#"+color;
});
const getNumOfLessons= (i_country, i_school, i_camp,records)=>{
              
  let dataToDisplay= noData;
  let filtered_recored =[];
  /*States not selected yet*/
  if((i_country === null)  || (i_camp=== null) || (i_school === null))
  {
    return noData;
  }
  /*If user selected school show all*/
  if(i_school[0]==="Show_All") 
  {
    /*get data filtered by selected camp and country*/
    filtered_recored= records[0].filter((record) => (
      ( ( record.camp===(i_camp[0]))&&(record.country===(i_country[0])))
     
    ));
    /*if no data found for required selection return no data*/
    if(filtered_recored===[])
    {
      return noData;
    }
    /*get all schools for selecr camp and companty and remove repeated values*/
    const matchedSchools= getUniqueSchool(filtered_recored);
    /*loop on unique schools we gathered to get all lessons per months related to each of them
       orderedResult shall contain array of arrays each one shall contain a school data to be displayed on chart*/
    let orderedResult=[];
    matchedSchools.forEach(function (mSchool, index) {
      /*ordere the list per school to represent each school with a chart*/
      orderedResult =[...orderedResult,filtered_recored.filter((record)=>(
        record.school===(mSchool)
      ))]; 

      /*Fill the dataset array for each school entry*/
      const receivedData=(fillData(orderedResult[index],mSchool,false,index));
      dataToDisplay.datasets[index]=(receivedData.datasets[0]);
    });

    console.log("matchedSchools",matchedSchools);
    console.log("orderedResult",orderedResult);

  }
  else{
    dataToDisplay=[];  
    /*get data based on user selections*/
    filtered_recored= records[0].filter((record) => {
    
      return ( ( (record.camp)===i_camp[0])&&((record.country)===(i_country[0]))
        &&((record.school)===(i_school[0])));
    });
    /*if no matched data return no data*/
    if(filtered_recored===[])
    {
      return noData;
    }
    console.log("filtered_recored",filtered_recored);
    let receivedData=fillData(filtered_recored,i_school[0],false,0);
    receivedData.datasets[0].borderColor= getColor();
    // dataToDisplay.push(fillData(filtered_recored,i_school[0],false,0))
    dataToDisplay=receivedData;
  }
  console.log("dataToDisplay",dataToDisplay);      
  return dataToDisplay;      
}; 
const fillData=(filtered_recored,i_school,clear)=>{
  console.log("filtered_recored",filtered_recored);
  let filledData=[noData];
  // filledData.forEach((element,index) => {
  //   filledData.splice(index, 1);
  // });
  filledData.push(noData);
  const lessons=filtered_recored.map((record)=>(record.lessons));
  const months=filtered_recored.map((record)=>(record.month));
  let totalLessons = 0;
  lessons.forEach(function (lesson) {
    totalLessons += lesson;
  });
  const lessonDataSet= {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","sep","Nov","Dec"],
    datasets: [
      {
        data: lessons,
        label: `${totalLessons} lessons in ${i_school}`,
        // borderColor: "#3333ff",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor:"rgba(0,0,0,1)",
        borderWidth: 2,
      }
    ]
  };
  
      
  console.log("totalLessons",totalLessons);
  if (clear===true)
  {
    filledData=noData;
    return fillData;
  }
  filledData=lessonDataSet ;
  filledData.labels=months;
  console.log("lessons",lessons);
  console.log("filledData",filledData);
  return filledData;
  
};
export default function ChartDrawer() {
  const { camp, country, school,records } = useSelector(state => ({
    camp: state.camp,
    country: state.country,
    school: state.school,
    records: state.records,
  }));
  const history = useHistory();
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  let chartData = getNumOfLessons(country,school,camp,records);
  console.log("camp",camp);
  console.log("school",school);
  console.log("country",country);
  console.log("record",records);
  console.log("chartData",chartData);

  /*function to handel user click on a point on the chart*/
  const handleClick=((dataIndex,datasetIndex)=>{
    if(chartData!==[]){
      const lessonsNum= chartData.datasets[datasetIndex].data[dataIndex];
      /*Extract school name from label to handle show all schools case*/
      const schoolLabel = chartData.datasets[datasetIndex].label;  
      const position = schoolLabel.search("in");
      const schoolName = schoolLabel.slice(position+3);
      /*Redirect to ChartDetail component*/
      history.push(`/chartDetails/${lessonsNum}/${schoolName}`);
    } 
  });
  
  return (
    <div style={{height:"450px", width:"700px" }}>
      <p>Chart view</p>
      <Line 
        data={chartData}
        options={{
          type: "line",
          onClick: (e, element) => {
            if (element.length > 0) {
              console.log("element",element);
              let ind = element[0].index;
              handleClick(ind,element[0].datasetIndex);
            }
          },
          responsive: true,
          events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
          legend:{
            position: "right"
          },
          title: {
            display: true,
            text: "Line Chart"
          }
        }} 
      />
    </div>
  );

}