import React, { Fragment } from 'react'
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {receiveRecords} from '../actions/records'
import { useState, useEffect } from 'react';

import{connect} from 'react-redux'
// import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

import { withRouter } from 'react-router-dom'

import Dashboard from './Dashboard'
import {handleInitialData} from '../actions/shared'
import ChartDetail from './ChartDetail';
import LoadingBar from 'react-redux-loading-bar'




export default function App () {

  const dispatch = useDispatch();

  const [ test, setTest ] = useState(false);

    useEffect(()=>{
      fetch('data.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
      // fetch('http://localhost:8080/https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json'
      // ,{
      //   headers : { 
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //    }
      // }
      // )
        .then(function(response){
          console.log(response)
          return response.json();
        })
      .then((records)=>{
        dispatch(receiveRecords(records))
        console.log(records);
          // setTest(true)
      
      });
    },[])
    console.log("records in app");

    return (
         <Router>
         <LoadingBar />
          <Nav />  
          <Switch>  
                    
          <Fragment> 
          <Route path='/' exact component={Dashboard} />
          <Route path='/chartDetails' component={ChartDetail} />
          {/* <Route path='/chartDetails' component={()=> <ChartDetail record={}/>} /> */}

            </Fragment>
                
          </Switch> 
      </Router>   
   
    )
  }


function mapStateToProps( {authedUser} ){
  return { 
      loading: authedUser === null 
  };
}
// export default connect(mapStateToProps)(App)
