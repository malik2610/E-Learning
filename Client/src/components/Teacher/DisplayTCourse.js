import React, { useEffect, useState } from 'react';
import styles1 from "../student/Enrol.module.css";
import Theader from './Theader';
import Tmenubar from './Tmenubar';
import styles2 from "../Teacher/DisplayCourses.module.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function DisplayTCourse() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTeacherCourses() {
            try {
                const response = await Axios.get(`http://localhost:8081/TeacherCoursesFileSystem`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching teacher courses:', error);
            }
        }
        fetchTeacherCourses();
    }, []);

    // const handleClick = (courseId) => {
    //     const selectedCourse = courses.find(course => course._id === courseId);
    //     console.log(selectedCourse)
    //     navigate(`/Course`, { state: { data: selectedCourse } });
    // };
    const handleClick = (courseId) => {
        navigate(`/Course/${courseId}`);
    };
    

    return (
        <div>
            <div><Theader /></div>
            <div><Tmenubar /></div>
            <div className={styles1.search}>
                <input type='search' placeholder='Enter the course name' /><input type="submit" value="search" />
            </div>
            <div className={styles1.AvailableCourses}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan={3}>No Data Available</td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course._id}</td>
                                    <td>{course.course}</td>
                                    <td>{course.duration} hours</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles2.nonCContainer}></div>
            <div className={styles2.CContainer}>
                <ul>
                    {courses.map(course => (
                        <li key={course._id} onClick={() => handleClick(course._id)}>
                            <div className={styles2.thumbnail}>
                                {course.thumbnail && (
                                    <img src={`data:image/jpeg;base64,${course.thumbnaildata}`} alt="Thumbnail" />
                                )}
                            </div>
                            <p><b>Course:</b>{course.course}</p>
                            <p><b>Duration:</b> {course.duration} hours</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DisplayTCourse;
