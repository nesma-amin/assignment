import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'



export default function Nav() {

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

