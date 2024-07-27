import React from 'react'
import styles from "../student/login.module.css";
function CSHeader() {
  return (
    <div className={styles.header}> 
          <nav>
            <ul>
              <li><a id="sl" href="/DisplayCourses">Home</a></li>
              <li>Student Portal</li>
         
              <li><a id="sl" href="/studentLogin">Logout</a></li>
            </ul>
          </nav>
        </div>
  )
}

export default CSHeader

