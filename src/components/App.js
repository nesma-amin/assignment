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
          
          <div className='container'> 

              <Nav />  
              <Switch>  
                    

                      <Fragment> 
                      <Route path='/' exact component={Dashboard} />
       
                      {/* <Route path='/question/:id' component={QuestionPage} /> */}
                       </Fragment>
                
                </Switch> 
          </div>           
      </Router>   
   
    )
  }


function mapStateToProps( {authedUser} ){
  return { 
      loading: authedUser === null 
  };
}
// export default connect(mapStateToProps)(App)

