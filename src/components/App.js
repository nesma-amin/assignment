import React, { Component, Fragment } from 'react'
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import{connect} from 'react-redux'
// import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

import { withRouter } from 'react-router-dom'

import Dashboard from './Dashboard'




class App extends Component {
  componentDidMount(){
    // this.props.dispatch(handleInitialData())
  }
  render() {
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
}

function mapStateToProps( {authedUser} ){
  return { 
      loading: authedUser === null 
  };
}
// export default connect(mapStateToProps)(App)
export default (App)
