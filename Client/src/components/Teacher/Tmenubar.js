import React from 'react'
import "../student/userhome.css"
function Tmenubar() {
  return (
    <>
      <div id="AdminMenuBar">
        <a id="sl" href='/TeacherProfile'><div>Profile</div></a>
        <a id="sl" href='/AddStudyMaterials'><div>Study Materials</div></a>
        <a id="sl" href='/DisplayTCourse'><div>Courses</div></a>
        <a id="sl" href='/AddCourse'><div>New Course</div></a>
        <a id="sl" href='/AddResources'><div>Add Resources</div></a>
        <a id="sl" href='/StudentList'><div>Students List</div></a>
      </div>
    </>
  )
}

export default Tmenubar
