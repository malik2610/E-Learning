import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import GetStarted from "../../student/GetStarted"
const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO OpenLearn' title='Best Online Education Expertise' />
            <p>Empowering learners worldwide with free access to high-quality educational resources. Explore diverse subjects, enhance skills, and unlock your potential with our interactive online platform.</p>
          </div>
          
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
