import React from 'react'
import styles from "../student/login.module.css";
function Theader() {
  return (
      <div className={styles.header}> 
          <nav>
            <ul>
              <li><a id="sl" href="/TeacherHome">Home</a></li>
              <li>Teacher Portal</li>
         
              <li><a id="sl" href="/TeacherLogin">Logout</a></li>
            </ul>
          </nav>
        </div>
  )
}

export default Theader
