import React, { useEffect, useState } from 'react'
import Uheader from './Uheader'
import UserMenuBar from './UserMenuBar'
import "../student/userhome.css";
import Axios from "axios"
import styles1 from "../student/login.module.css";
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
function StudentProfile() {

    const navigate=useNavigate();

    const [data,setData]=useState({"name":"","education":"","phone":"","university":"","email":"","state":"Karnataka"})
    useEffect(() => {
        Axios.get("http://localhost:8081/StudentProfile")
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);
    
    const submitHandler=(e)=>[
        navigate('/EditProfile')
    ]
    

    return (
        <div>
            <div><Uheader /></div>
            <div><UserMenuBar /></div>
            <div>
                <center>

                <form className={styles1.loginform1} onSubmit={submitHandler}>
                        <div className={styles1.formgroup}><label>First Name</label><input type="text" placeholder='First Name' value={data.name} readOnly/></div>
                        <div className={styles1.formgroup}><label>Mobile Number</label><input type="text" placeholder='' value={data.phone} readOnly/></div>
                        <div className={styles1.formgroup}><label>State</label><select value={data.state} readOnly><option>Select</option><option value={"Karnataka"}>Karnataka</option><option>Maharashtra</option></select></div>
                        <div className={styles1.formgroup}><label>Email-ID</label><input type="email" placeholder="enter mail id" value={data.email} readOnly/></div>
                        <div className={styles1.formgroup}><label>Education</label><input type="text" placeholder='education' value={data.education} readOnly/></div>
                        <div className={styles1.formgroup}><button type='submit'>Edit</button></div>
                    </form>
                </center>
            </div>
        </div>


    )
}

export default StudentProfile
