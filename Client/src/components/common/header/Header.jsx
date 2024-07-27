import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          {/* <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}> */}
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <a href='/'>Home</a>
            </li>
            {/* <li>
              <a href='/courses'>All Courses</a>
            </li> */}
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/team'>Team</a>
            </li>
            {/* <li>
              <Link to='/pricing'>Pricing</Link>
            </li> */}
            {/* <li>
              <Link to='/journal'>Journal</Link>
            </li> */}
            <li>
              <a href='/contact'>Contact</a>
            </li>

          </ul>
          <div className='start'>
            <div className='button'>
              {/* <select onChange={(e) => window.location.href = e.target.value}>
                <option>Login</option>
                <option value="/studentLogin">Student</option>
                <option value="/teacher">Teacher</option>
              </select> */}
              <select class="custom-select" onChange={(e) => window.location.href = e.target.value}>
                <option class="custom-option">Login</option>
                <option class="custom-option" value="/studentLogin">Student</option>
                <option class="custom-option" value="/TeacherLogin">Teacher</option>
              </select>
            </div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
