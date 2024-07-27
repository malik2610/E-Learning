import React, { useEffect, useState } from 'react'
import Theader from './Theader';
import Tmenubar from './Tmenubar';
import "../student/userhome.css";
import styles1 from "../student/login.module.css";
import { useNavigate } from 'react-router-dom';
import Axios from "axios"
function TeacherProfile() {
    const navigate=useNavigate();

    const [data,setData]=useState({"name":"","education":"","phone":"","university":"","email":"","state":""})
    useEffect(() => {
        Axios.get("http://localhost:8081/TeacherProfile")
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);
    
    const submitHandler=(e)=>[
        navigate('/EditTeacherProfile')
    ]
    

    return (
        <div>
            <div><Theader /></div>
            <div><Tmenubar /></div>
            <div>
                <center>

                <form className={styles1.loginform1} onSubmit={submitHandler}>
                        <div className={styles1.formgroup}><label>First Name</label><input type="text" placeholder='First Name' value={data.name} readOnly/></div>
                        <div className={styles1.formgroup}><label>Mobile Number</label><input type="text" placeholder='' value={data.phone} readOnly/></div>
                        <div className={styles1.formgroup}><label>State</label><select value={data.state} readOnly><option>Select</option><option>Karnataka</option><option>Maharashtra</option></select></div>
                        <div className={styles1.formgroup}><label>Email-ID</label><input type="email" placeholder="enter mail id" value={data.email} readOnly/></div>
                        <div className={styles1.formgroup}><label>Education</label><input type="text" placeholder='education' value={data.education} readOnly/></div>
                        <div className={styles1.formgroup}><button type='submit'>Edit</button></div>
                    </form>
                </center>
            </div>
        </div>


    )
}

export default TeacherProfile
