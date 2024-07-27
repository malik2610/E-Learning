import React, { useEffect, useState } from 'react';
import Uheader from './Uheader';
import UserMenuBar from './UserMenuBar';
import styles from "../student/userhome.css"; 
import styles1 from "../student/Enrol.module.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function EnrollCourse() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const SubmitHandler = (course) => (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8081/EnrollCourse", course)
            .then((response) => {
                if (response.data === "Yes") {
                    alert("Enrolled Successfully");
                    navigate("/EnrollCourse");
                } else {
                    alert("Try Again Later");
                    navigate("/EnrollCourse");
                }
            })
            .catch((error) => {
                console.error('Error enrolling course:', error);
            });
    };

    // useEffect(() => {
    //     async function fetchTeacherCourses() {
    //         try {
    //             const response = await Axios.get(`http://localhost:8081/AllCoursesWithTeachers`);
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching teacher courses:', error);
    //         }
    //     }
    //     fetchTeacherCourses();
    // }, []);
    useEffect(() => {
        async function fetchTeacherCourses() {
            try {
                const response = await Axios.get(`http://localhost:8081/AllCoursesWithTeachersFileSystem`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching teacher courses:', error);
            }
        }
        fetchTeacherCourses();
    }, []);

    return (
        <div>
            <Uheader />
            <UserMenuBar />
            <div className={styles1.search}>
                <input type='search' placeholder='Enter the course name' />
                <input type="submit" value="search" />
            </div>

            <div className={styles1.AvailableCourses}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Teacher</th>
                            <th>Duration</th>
                            <th>Enroll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5}>No Data Available</td>
                            </tr>
                        ) : (
                            data.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.course_id}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.teacherName}</td>
                                    <td>{course.duration} hours</td>
                                    <td><button className={styles1.enroll} type="submit" onClick={SubmitHandler(course)}> Enroll </button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EnrollCourse;
