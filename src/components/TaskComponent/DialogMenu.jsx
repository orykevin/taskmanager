import React from 'react'
import rightIcon from "../../assets/arrowRight.svg"
import leftIcon from "../../assets/arrowLeft.svg"
import editIcon from "../../assets/editIcon.svg"
import deleteIcon from "../../assets/deleteIcon.svg"
import { ClickAwayListener } from '@mui/material'
import { deleteRequest, postRequest } from '../../function/getPost'


function DialogMenu({
  setShowModal,
  setShowModal2,
  handleClose,
  setShowDialog,
  indexGroup,
  groupLength,
  groupData,
  taskData,
  getAllTodos,
  getAllTask
}){

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURLDel = `${import.meta.env.VITE_API_URL}todos/${taskData.todo_id}/items/${taskData.id}`

  const addNewTask = (title,percent,apiURL) =>{
    const createTaskData = {
      "name": title,
      "progress_percentage": parseInt(percent)
    }
    postRequest(apiURL,createTaskData,auth_token).then(()=>{
      getAllTodos()
      getAllTask()
    })
    
  }
  const deleteTask = (apiURL) => {
    deleteRequest(apiURLDel,auth_token).then(()=>{
        addNewTask(taskData.name,taskData.progress_percentage,apiURL)
        handleClose()
    })
  }

    const handleClickAway = () =>{
        setShowDialog(false)
    }

  const handleMove = (move) =>{
      if(move == "right"){
          const apiURLAdd = `${import.meta.env.VITE_API_URL}todos/${groupData[indexGroup+1].id}/items`
          deleteTask(apiURLAdd)
      }else{
          const apiURLAdd = `${import.meta.env.VITE_API_URL}todos/${groupData[indexGroup-1].id}/items`
          deleteTask(apiURLAdd)
      }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className='dialogMenu'>
        {indexGroup !== groupLength - 1 && <div className='iconContainer' onClick={()=>handleMove("right")}>
            <img src={rightIcon} />
            <p>Move Right</p>
        </div>}
        {indexGroup !== 0 && <div className='iconContainer' onClick={()=>handleMove("left")}>
            <img src={leftIcon} />
            <p>Move Left</p>
        </div>}
        <div className='iconContainer' onClick={()=>{setShowModal2(true);handleClose()}}>
            <img src={editIcon} />
            <p>Edit</p>
        </div>
        <div className='iconContainer' onClick={()=>{setShowModal(true);handleClose()}}>
            <img src={deleteIcon} />
            <p className='deleteHover'>Delete</p>
        </div>
    </div>
    </ClickAwayListener>
  )
}

export default DialogMenu