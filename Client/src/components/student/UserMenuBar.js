import React from 'react'
import "../student/userhome.css"

function UserMenuBar() {
  return (
    <>
      <div id="AdminMenuBar">
        <a id="sl" href='/StudentProfile'><div>Profile</div></a>
        <a id="sl" href='/StudyMaterials'><div>Study Materials</div></a>
        <a id="sl" href='/DisplayCourses'><div>Courses</div></a>
        <a id="sl" href='/EnrollCourse'><div>Enroll Courses</div></a>
        {/* <a id="sl" href='/DoubtSection'><div>DoubtSection</div></a> */}
      </div>
    </>
  )
}

export default UserMenuBar
