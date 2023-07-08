import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import closeIcon from "../../assets/closeIcon.svg";
import "../../styles/modalAdditional.scss"
import InputBox from '../reuseableComp/InputBox';
import ButtonBox from '../reuseableComp/ButtonBox';
import { postRequest } from '../../function/getPost';

function CreateNewTask({showCreate,setShowCreate,tasks,setTasks,id,getAllTask}) {

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos/${id}/items`

  const [inputTitle,setInputTitle] = useState("")
  const [inputPercent,setInputPercent] = useState(0)

  const addNewTask = (title,percent) =>{
    const createTaskData = {
      "name": title,
      "progress_percentage": parseInt(percent)
    }
    const newTaskData = [...tasks,createTaskData]
    //setTasks(newTaskData)
    postRequest(apiURL,createTaskData,auth_token).then((res)=>{
      console.log(res)
      getAllTask()
    })
    
  }

  return (
    <div>
        <Dialog open={showCreate} 
       onClose={()=>setShowCreate(!showCreate)} 
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
          Create Task
          <img src={closeIcon} className='closeModal' onClick={()=>setShowCreate(!showCreate)} />
        </DialogTitle>
        <DialogContent>
          <InputBox title="Task Name" placeholder="Type your Task" setInput={setInputTitle} />
          <InputBox title="Progress" placeholder="0%" styles={{width:"30%"}} type="number" setInput={setInputPercent} />
          <div className='buttonContainer'>
          <ButtonBox text="Cancel" funcClick={()=>setShowCreate(!showCreate)} />
          <ButtonBox text="Save Task" bgColor="#01959F" funcClick={()=>addNewTask(inputTitle,inputPercent)} />
          </div>
        </DialogContent>
       </Dialog>
    </div>
  )
}

export default CreateNewTask