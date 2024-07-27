import React, { useEffect, useState } from 'react';
import Theader from './Theader';
import Tmenubar from './Tmenubar';
import styles from "../student/login.module.css";
import "../student/userhome.css";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

function AddCourse() {


   

    const navigate = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('course', e.target.course.value);
        formData.append('duration', e.target.duration.value);
        formData.append('thumbnail', e.target.thumbnail.files[0]);
        try {
            const response = await Axios.post("http://localhost:8081/AddCourseFileSystem", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data === "Yes") {
                alert("Added Successfully");
                navigate("/AddCourse");
            } else {
                alert("Try Again Later");
                navigate("/AddCourse");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };

    return (
        <div>
            <Theader />
            <Tmenubar />
            <div className={styles.loginform2}>
                <center><h2>Add Course</h2></center>
                <br />
                <br />
                <form onSubmit={SubmitHandler}>
                    <div className={styles.formgroup}>
                        <label>Course</label>
                        <input type="text" name="course" placeholder='Enter course name' />
                    </div>
                    <div className={styles.formgroup}>
                        <label>Duration</label>
                        <input type="text" name="duration" placeholder='In hours' />
                    </div>
                    <div className={styles.formgroup}>
                        <label>Image</label>
                        <input className="upload-input" type="file" name="thumbnail" id="file" accept="image/*" />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
           

        </div>
    );
}

export default AddCourse;
