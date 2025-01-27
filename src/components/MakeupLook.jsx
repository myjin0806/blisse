import React from 'react'
import  '../styles/components/MakeupLook.scss';
import { FaArrowRight } from "react-icons/fa6";

const MakeupLook = () => {
  return (
    <div className="MakeupLook">
      <div className="MakeupLook-title">
        <h2>Makeup Look</h2>
        <p>핫한 셀럽들이 하는 메이크업은?</p>
      </div>
      <div className="MakeupLook-inner">
        <div className="MakeupLook-img">
          <img src="/assets/images/main/MakeupLook01.jpg" alt="MakeupLook" />
          <img src="/assets/images/main/MakeupLook02.jpg" alt="MakeupLook" />
          <img src="/assets/images/main/MakeupLook03.jpg" alt="MakeupLook" />
        </div>
        <a href="#none" className="more">MORE VIEW <FaArrowRight className='MakeupLook-more'/></a>
      </div>
      <div className="MakeupLook-text">
        <p>
        Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup Celebrity Makeup
        </p>
      </div>
    </div>
  )
}

export default MakeupLook