import React, { useState } from 'react'
import "../../styles/reuseableComp.scss"

function InputBox({title,placeholder,styles,textarea,setInput,type}) {


  const handleChange = event =>{
    setInput(event.target.value)
  }

  const customStyle = styles
  console.log(type)
  
  return (
    <div>
        {title && <p className='inputTitle'>{title}</p>}
        {!textarea ? <input style={customStyle} 
            className='inputBox' 
            type={type == "number" ? "number" : "text"}
            placeholder={placeholder ? placeholder : ""}
            onChange={handleChange}
        /> : 
        <textarea style={customStyle} 
            className='inputBox' 
            type="text" 
            placeholder={placeholder ? placeholder : ""}
            onChange={handleChange}
        />
        }
    </div>
  )
}

export default InputBox