import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import closeIcon from "../../assets/closeIcon.svg";
import "../../styles/modalAdditional.scss"
import InputBox from '../reuseableComp/InputBox';
import ButtonBox from '../reuseableComp/ButtonBox';
import { patchRequest } from '../../function/getPost';


function EditTask({showModal,setShowModal,taskData,setTaskData}) {

  const [inputName,setInputName] = useState("")
  const [inputPercent,setInputPercent] = useState(0)

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos/${taskData.todo_id}/items/${taskData.id}`

  const updateTask = () =>{
    let prevData = taskData
    if(inputName !== ""){
      prevData.name = inputName
      const dataAPI = {
        "target_todo_id" : prevData.todo_id,
        "name" : prevData.name
      }
      setTaskData(prevData)
      patchRequest(apiURL,dataAPI,auth_token)
      setShowModal(false)
    }
    
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
          Edit Task
          <img src={closeIcon} className='closeModal' onClick={()=>setShowModal(!showModal)} />
        </DialogTitle>
        <DialogContent>
          <InputBox title="Task Name" placeholder="Type your Task" setInput={setInputName} />
          <InputBox title="Progress" placeholder="70%" styles={{width:"30%"}} setInput={setInputPercent} />
          <div className='buttonContainer'>
          <ButtonBox text="Cancel" funcClick={()=>setShowModal(!showModal)} />
          <ButtonBox text="Save Task" bgColor="#01959F" funcClick={()=>updateTask()} />
          </div>
        </DialogContent>
       </Dialog>
    </div>
  )
}

export default EditTask