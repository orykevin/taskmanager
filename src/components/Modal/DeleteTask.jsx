import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import closeIcon from "../../assets/closeIcon.svg";
import warningIcon from "../../assets/warning.svg"
import "../../styles/modalAdditional.scss"
import ButtonBox from '../reuseableComp/ButtonBox';
import { deleteRequest } from '../../function/getPost';

function DeleteTask({showModal,setShowModal,data,tasks,setTasks,i}) {


  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos/${data.todo_id}/items/${data.id}`

  const deleteTask = () => {
    const indexTask = tasks.findIndex((task) => task.id == data.id)
    const newTask = [...tasks]
    newTask.splice(i,1)
    console.log(newTask)
    setTasks(newTask)
    console.log(tasks)
    deleteRequest(apiURL,auth_token)
    setShowModal(false)
  }

  return (
    <div>
        <Dialog open={showModal} 
       onClose={()=>setShowModal(!showModal)} 
       sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "420px", 
            borderRadius:"10px"
          },
        },
      }}>
        <DialogTitle>
            <img src={warningIcon} className='iconTitle' />
          Delete Task
          <img src={closeIcon} className='closeModal' onClick={()=>setShowModal(!showModal)} />
        </DialogTitle>
        <DialogContent>
          <p className='paraModal'>Are you sure want to delete this task? your action can’t be reverted.</p>
          <div className='buttonContainer'>
          <ButtonBox text="Cancel" funcClick={()=>setShowModal(!showModal)} />
          <ButtonBox text="Delete" bgColor="#E11428" funcClick={()=>deleteTask()} />
          </div>
        </DialogContent>
       </Dialog>
    </div>
  )
}

export default DeleteTask