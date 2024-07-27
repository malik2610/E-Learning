import React, { useEffect, useState } from 'react'
import Uheader from './Uheader'
import UserMenuBar from './UserMenuBar'
import styles1 from "../student/Enrol.module.css"
import styles2 from "../Teacher/DisplayCourses.module.css";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
function DisplayCourses() {

  const [data, setData] = useState([]);
    const [courses, setCourses] = useState([]);
    const navigate=useNavigate();

    // useEffect(() => {
    //     async function fetchTeacherCourses() {
    //         try {
    //             const response = await Axios.get(`http://localhost:8081/EnrolledCourses`);
    //             setCourses(response.data);
    //             console.log(response.data)
    //         } catch (error) {
    //             console.error('Error fetching teacher courses:', error);
    //         }
    //     }
    //     fetchTeacherCourses();
    // }, []);
    useEffect(() => {
      async function fetchTeacherCourses() {
          try {
              const response = await Axios.get(`http://localhost:8081/EnrolledCoursesFileSystem`);
              setCourses(response.data);
              console.log(response.data)
          } catch (error) {
              console.error('Error fetching teacher courses:', error);
          }
      }
      fetchTeacherCourses();
  }, []);

  const handleClick = (courseId) => {
    navigate(`/SCourse/${courseId}`);
};


  return (
    <div>
      <div><Uheader/></div>
    <div><UserMenuBar/></div>
    <div className={`${styles2.Courses} ${styles2.CContainer}`}>
                    <ul>
                        {courses.map(course => (
                           <li key={course.course_id} onClick={() => handleClick(course.course_id)}>
                                <div className={styles2.thumbnail}>{course.thumbnail && (
                                    // <img src={`data:image/jpeg;base64,${course.thumbnail}`} alt="Thumbnail" />
                                    <img src={`data:image/jpeg;base64,${course.thumbnaildata}`} alt="Thumbnail" />
                                )}</div>
                                <p><b>Course:</b>{course.courseName}</p>
                                <p><b>Duration:</b> {course.duration} hours</p>
                            </li>
                        ))}
                    </ul>
            </div>
    </div>
  )
}

export default DisplayCourses
