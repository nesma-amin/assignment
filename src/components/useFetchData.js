import {  useDispatch } from 'react-redux'
import {receiveRecords} from '../actions/records'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export default function fetchData(){

    const dispatch=useDispatch
    // fetch('http://localhost:8080/https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json'
    // ,{
    //   headers : { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    // }
    // )
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
    .then((records)=>{
      dispatch(receiveRecords(records))
      console.log(records);
      dispatch(hideLoading())  
    });
  }