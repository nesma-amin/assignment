import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'



class Nav extends Component {
  render(){
    const { authedUser } = this.props;

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  )
} 
}
function mapStateToProps( {authedUser} ){
  return { 
    // authedUser:authedUser?authedUser[0]:null
  };
}
// export default withRouter(connect(mapStateToProps)(Nav))
export default (Nav)