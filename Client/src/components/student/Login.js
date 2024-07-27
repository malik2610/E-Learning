import React from 'react';
import styles from "../student/login.module.css"; 
import Header from "../common/header/Header";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
function Login() {

  const navigate=useNavigate();
  const SubmitHandler=(e)=>{
    e.preventDefault();
    var data={}
    var formData=new FormData(e.target);
    formData.forEach((value,key)=>{
      data[key]=value;
    })
    Axios.post("http://localhost:8081/Slogin",data)
    .then((response)=>{
      if(response.data=="Yes"){
        alert("Login Successfully")
        navigate("/UserHome")
      }
      else{
        alert("Username or Password is Invalid");
        navigate("/studentLogin");
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
        <center><h2>Student Login</h2></center>
          <form action='/UserHome' onSubmit={SubmitHandler}>
            <div className={styles.formgroup}>
              <label>Username</label>
              <input type="text" name="name" />
            </div>
            <div className={styles.formgroup}>
              <label>Password</label>
              <input type="password" name="password" />
            </div>
            <button type="submit">Submit</button>
            <div className={styles.formgroup}>
              <label>If U don't have an Account:</label>
              <a href='StudentRegistration'>Register</a>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
