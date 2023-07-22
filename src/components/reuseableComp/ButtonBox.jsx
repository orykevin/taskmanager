import React from 'react'
import "../../styles/reuseableComp.scss"

function ButtonBox({
  text,
  bgColor,
  funcClick,
  paddings,
  fontSize
  }){
    
  return (
    <div className='buttonBox' 
    style={{background:bgColor ? bgColor : "",
    color:bgColor ? "white" : "block",
    border: !bgColor ?  "1px solid #E0E0E0" : "",
    padding: paddings ? paddings : "",
    fontSize : fontSize ? fontSize : "",
    }}
    onClick={()=>{
        funcClick()
    }}>
        {text ? text : ""}
    </div>
  )
}

export default ButtonBox