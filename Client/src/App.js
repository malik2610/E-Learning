import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter, Routes,  Route} from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import Login from "./components/student/Login"
import StudentRegistration from "./components/student/StudentRegistration"
import UserHome from "./components/student/UserHome"
import Tlogin from "./components/Teacher/Tlogin"
import THome from "./components/Teacher/THome"
import StudentProfile from "./components/student/StudentProfile"
import EditProfile from "./components/student/EditProfile"
import EnrollCourse from "./components/student/EnrollCourse"
import StudyMaterials from "./components/student/StudyMaterials"
import DisplayCourses from "./components/student/DisplayCourses"
import TeacherProfile from "./components/Teacher/TeacherProfile"
import EditTeacherProfile from "./components/Teacher/EditTeacherProfile"
import DisplayTCourse from "./components/Teacher/DisplayTCourse"
import AddStudyMaterials from "./components/Teacher/AddStudyMaterials"
import AddResources from "./components/Teacher/AddResources"
import AddCourse from "./components/Teacher/AddCourse"
import StudentList from "./components/Teacher/StudentList"
import Course from "./components/Teacher/Course"
import SCourse from "./components/student/SCourse"
function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/courses' element={<CourseHome/>} />
          <Route path='/team' element={<Team/>} />
          <Route path='/pricing' element={<Pricing/>} />
          <Route path='/journal' element={<Blog/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/studentLogin' element={<Login/>} />
          <Route path='/StudentRegistration' element={<StudentRegistration/>} />
          <Route path='/UserHome' element={<UserHome/>} />
          <Route path='/TeacherLogin' element={<Tlogin/>} />
          <Route path='/TeacherHome' element={<THome/>} />
          <Route path='/StudentProfile' element={<StudentProfile/>} />
          <Route path='/EditProfile' element={<EditProfile/>} />
          <Route path='/EnrollCourse' element={<EnrollCourse/>} />
          <Route path='/StudyMaterials' element={<StudyMaterials/>} />
          <Route path='/DisplayCourses' element={<DisplayCourses/>} />
          <Route path='/TeacherProfile' element={<TeacherProfile/>} />
          <Route path='/EditTeacherProfile' element={<EditTeacherProfile/>} />
          <Route path='/DisplayTCourse' element={<DisplayTCourse/>} />
          <Route path='/AddStudyMaterials' element={<AddStudyMaterials/>} />
          <Route path='/AddResources' element={<AddResources/>} />
          <Route path='/AddCourse' element={<AddCourse/>} />
          <Route path='/StudentList' element={<StudentList/>} />
          <Route path='/Course' element={<Course/>} />
          <Route path="/Course/:courseId" element={<Course/>} />
          <Route path='/SCourse' element={<SCourse/>} />
          <Route path="/SCourse/:courseId" element={<SCourse/>} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
