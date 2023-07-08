import React from 'react'
import checkmark from "../../assets/checkMark.svg"

function ProgressCount({percent}) {
  return (
    <div className='percentContainer'>
        <div className='percentBarBg'>
          <div className='percentBar' style={{width:`${percent}%`,background : percent>=100 && "#43936C"}}></div>
        </div>
        {percent >= 100 ? <img src={checkmark} className='checkmark' /> :
          <span className='percentage'>{percent > 100 ? 100 : percent}%</span>
        }
    </div>
  )
}

export default ProgressCount