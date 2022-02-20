import { useSelector, useDispatch } from 'react-redux'



const getInitialData=()=>{
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
     
  }
export function handleInitialData (){

        return getInitialData() 
       
        
    
}