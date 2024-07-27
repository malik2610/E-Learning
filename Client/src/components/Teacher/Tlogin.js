import React from 'react'
import styles from "../student/login.module.css"; 
import Header from "../common/header/Header";

import Axios from "axios"
import { useNavigate } from 'react-router-dom';

function Tlogin() {

  const navigate=useNavigate();
  const SubmitHandler=(e)=>{
    e.preventDefault();
    var data={}
    var formData=new FormData(e.target);
    formData.forEach((value,key)=>{
      data[key]=value;
    })
    Axios.post("http://localhost:8081/Tlogin",data)
    .then((response)=>{
      if(response.data=="Yes"){
        alert("Login Successfully")
        navigate("/TeacherHome")
      }
      else{
        alert("Username or Password is Invalid");
        navigate("/TeacherLogin");
      }
    })
  }

  return (
    <div className={styles.slb}>
      <div className={styles.loginPage}> 
        {/* <div className={styles.header}> 
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li>Student Portal</li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </nav>
        </div> */}
        <Header/>
        <div className={styles.loginFormContainer}>
        <div className={styles.loginform}>
            <center><h2>Teacher Login</h2></center>
           
          <form action='/TeacherHome' onSubmit={SubmitHandler}>
            <div className={styles.formgroup}>
              <label>Username</label>
              <input type="text" name="name" />
            </div>
            <div className={styles.formgroup}>
              <label>Password</label>
              <input type="password" name="password" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Tlogin
