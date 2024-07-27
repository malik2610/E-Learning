import React from 'react'
import styles from "../student/login.module.css"; // Import CSS module
import Header from "../common/header/Header";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
function StudentRegistration() {

  const navigate=useNavigate();
  const SubmitHandler=(e)=>{
    e.preventDefault();
    var data={}
    var formData=new FormData(e.target);
    formData.forEach((value,key)=>{
      data[key]=value;
    })
    Axios.post("http://localhost:8081/Sregister",data)
    .then((response)=>{
      if(response.data=="Yes"){
        alert("Registered Successfully")
        navigate("/studentLogin")
      }
      else{
        alert("Email is already Registered");
        navigate("/StudentRegistration");
      }
    })
  }

  

  return (
    <div className={styles.slb}>
      <div className={styles.loginPage}> {/* Apply CSS module class */}
        {/* <div className={styles.header}> 
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/courses">Student Portal</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </nav>
        </div> */}
       <Header/>
        <div className={styles.loginFormContainer}>
        <div className={styles.loginform}>
        <center><h3>Student Registration</h3></center>
         <br/>
     
          <form action='/StudentLogin' onSubmit={SubmitHandler}>
            <div className={styles.formgroup}>
              <label>Full Name</label>
              <input type="text" id="firstName" name="name" />
            </div>
            <div className={styles.formgroup}>
              <label>Education</label>
              <input type="text" id="education" name="education" />
            </div>
            <div className={styles.formgroup}>
              <label>University</label>
              <input type="text" id="university" name="university" />
            </div>
            <div className={styles.formgroup}>
              <label>Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegistration
