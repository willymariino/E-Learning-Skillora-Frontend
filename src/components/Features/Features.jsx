import React from 'react'
import { VscCallOutgoing } from "react-icons/vsc";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";
import './Features.css'

const Features = () => {
  return (
    <div className="card-container" data-aos="fade-up">
      <div className='features-card-container'>
        <div className="card-item block" data-aos="fade-up" data-aos-delay="100">
          <div className="icon-card-container" data-aos="zoom-in" data-aos-delay="200">
            <VscCallOutgoing className='icon-card'/>
          </div>
          <h3 className="header-card-3" data-aos="fade-up" data-aos-delay="300">24/7 Support</h3>
          <p className="p-card" data-aos="fade-up" data-aos-delay="400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa non doloremque odit qui commodi? Obcaecati?</p>
        </div>

        <div className="card-item block" data-aos="fade-up" data-aos-delay="300">
          <div className="icon-card-container" data-aos="zoom-in" data-aos-delay="400">
            <RiMoneyDollarBoxLine className='icon-card'/>
          </div>
          <h3 className="header-card-3" data-aos="fade-up" data-aos-delay="500">Save Money</h3>
          <p className="p-card" data-aos="fade-up" data-aos-delay="600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At perferendis vel sed dolorum repellat impedit.</p>
        </div>

        <div className="card-item block" data-aos="fade-up" data-aos-delay="500">
          <div className="icon-card-container" data-aos="zoom-in" data-aos-delay="600">
          <BsPersonVideo3 className='icon-card'/>
          </div>
          <h3 className="header-card-3" data-aos="fade-up" data-aos-delay="700">Best Mentors</h3>
          <p className="p-card" data-aos="fade-up" data-aos-delay="800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, nihil. Alias vitae aperiam animi neque?</p>
        </div>
      </div>
    </div>
  )
}

export default Features
