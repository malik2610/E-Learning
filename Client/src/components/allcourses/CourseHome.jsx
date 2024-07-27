import React from "react"
import Back from "../common/back/Back"
import CoursesCard from "./CoursesCard"
import OnlineCourses from "./OnlineCourses"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"
const CourseHome = () => {
  return (
    <>
    <Header />
      <Back title='Explore Courses' />
      <CoursesCard />
      <OnlineCourses />
      <Footer/>
    </>
  )
}

export default CourseHome
