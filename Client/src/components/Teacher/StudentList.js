import React, { useEffect, useState } from 'react'

import styles1 from "../student/Enrol.module.css"
import Axios from "axios"
import Theader from './Theader'
import Tmenubar from './Tmenubar'
function StudentList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchTeacherCourses() {
            try {
                const response = await Axios.get(`http://localhost:8081/StudentsEnrolledByTeacher`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching teacher courses:', error);
            }
        }
        fetchTeacherCourses();
    }, []);


  return (
    <div>
      <div><Theader /></div>
            <div><Tmenubar /></div>
    <div className={styles1.AvailableCourses}>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Phone Number</th>
                    </tr>
                    {data.length === 0 ? (<tr>
                        <td colSpan={4}>No Data Available</td>
                    </tr>) : (
                        data.map((student, index) => (
                            <tr key={student.studentId}>
                                <td>{student.studentId }</td>
                                <td>{student.name }</td>
                                <td>{student.email }</td>
                                <td>{student.phone }</td>
                            </tr>
                        ))
                    )}


                </table>

            </div>

    </div>
  )
}

export default StudentList
