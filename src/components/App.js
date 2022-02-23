import React, { Fragment } from "react";
import { Switch, Route } from "react-router-loading";
import{BrowserRouter as Router} from "react-router-dom";
import {  useDispatch } from "react-redux";
import {receiveRecords} from "../actions/records";
import { useEffect} from "react";

// import LoadingBar from 'react-redux-loading'
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import ChartDetail from "./ChartDetail";
import LoadingBar from "react-redux-loading-bar";
import { showLoading, hideLoading } from "react-redux-loading-bar";





export default function App () {

  const dispatch = useDispatch();

  const fetchData=(()=>{

    // fetch('http://localhost:8080/https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json'
    // ,{
    //   headers : { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    // }
    // )
    fetch("data.json"
      ,{
        headers : { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    )
      .then(function(response){
        console.log(response);
        return response.json();
      })
      .then((records)=>{
        dispatch(receiveRecords(records));
        console.log(records);
        dispatch(hideLoading());  
      });
  });
  useEffect(()=>{
    dispatch(showLoading());
    //Start the timer to make 1s delay to show the loading bar
    setTimeout(function() { 

      fetchData();

    }, 1000);

  });
  console.log("records in app");

  return (
    <Router>
      <LoadingBar/>
      <div className='container'> 
        <Nav />  
        <Switch>  
                    
          <Fragment> 
            <Route path='/' exact component={Dashboard} />
            <Route exact path='/chartDetails/:lessonsNum/:schoolName' component={ChartDetail} />
          </Fragment>
                
        </Switch> 
      </div>
    </Router>   
   
  );
}
