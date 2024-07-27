import React from 'react'
import Uheader from './Uheader'
import UserMenuBar from './UserMenuBar'
import "../student/userhome.css";
import styles1 from "../student/login.module.css";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
function EditProfile() {

    const navigate=useNavigate();
  const SubmitHandler=(e)=>{
    e.preventDefault();
    var data={}
    var formData=new FormData(e.target);
    formData.forEach((value,key)=>{
      data[key]=value;
    })
    Axios.post("http://localhost:8081/StudentProfile",data)
    .then((response)=>{
      if(response.data=="Yes"){
        alert("Updated Successfully")
        navigate("/StudentProfile")
      }
      else{
        alert("try Again Later");
        navigate("/EditProfile");
      }
    })
  }
    return (
        <div>
            <div><Uheader /></div>
            <div><UserMenuBar /></div>
            <div>
                <center>
                    <div className={styles1.loginFormContainer}>
                        <form className={styles1.loginform1} onSubmit={SubmitHandler}>
                            <div className={styles1.formgroup}><label>First Name</label><input type="text" name='name' placeholder='First Name' /></div>
                            <div className={styles1.formgroup}><label>Mobile Number</label><input type="text" name='phone' placeholder='enter mobile number' /></div>
                            <div className={styles1.formgroup}><label>State</label><select name='state'><option>Select</option><option value={"Karnataka"}>Karnataka</option><option value={"Maharashtra"}>Maharashtra</option></select></div>
                            <div className={styles1.formgroup}><label>Email-ID</label><input type="email" name='email' placeholder="enter mail id" /></div>
                            <div className={styles1.formgroup}><label>Education</label><input type="text" name='education' placeholder='education' /></div>
                            <div className={styles1.formgroup}><button type="submit">Update</button></div>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default EditProfile
