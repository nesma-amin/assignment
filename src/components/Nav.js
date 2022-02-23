import React from "react";
import { NavLink } from "react-router-dom";




export default function Nav() {
  const language="";
  const handleSetLanguage=(()=>{

  });
  return (
    <nav className='nav'>
      <ul style={{display:"flex", position:"relative", padding: "10px"}}>
        <li>
          <select
            className="custom-select"
            value={language}
            onChange={e => handleSetLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Malayalam">Arabic</option>
          </select>

        </li>
        <li style={{display:"flex", position:"right", padding: "10px"}}>
          <NavLink to='/' exact activeClassName='active'>
          change them
          </NavLink>
        </li>
      </ul>
    </nav>
  );
} 

