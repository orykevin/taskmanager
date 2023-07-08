import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import closeIcon from "../../assets/closeIcon.svg";
import "../../styles/modalAdditional.scss"
import InputBox from '../reuseableComp/inputBox';
import ButtonBox from '../reuseableComp/ButtonBox';
import { postRequest } from '../../function/getPost';



function CreateNewGroup({ showCreate,setShowCreate,groupData,setGroupData}) {

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos`

  const [inputTitle,setInputTitle] = useState("")
  const [inputDesc,setInputDesc] = useState("")

  const addNewGroup = (title,desc) =>{
    const createGroupData = {
      "title": title,
      "description": desc
    }
    const newGroupData = [...groupData,createGroupData]
    console.log(createGroupData)
    postRequest(apiURL,createGroupData,auth_token)
    setGroupData(newGroupData)
    setShowCreate(!showCreate)
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
          Add New Group
          <img src={closeIcon} className='closeModal' onClick={()=>setShowCreate(!showCreate)} />
        </DialogTitle>
        <DialogContent>
          <InputBox title="Title" placeholder="Type your Title" setInput={setInputTitle} />
          <InputBox title="Description" placeholder="Type your Description" styles={{height:"100px"}} textarea={true} setInput={setInputDesc} />

          <div className='buttonContainer'>
          <ButtonBox text="Cancel" funcClick={()=>setShowCreate(!showCreate)} />
          <ButtonBox text="Submit" bgColor="#01959F" funcClick={()=>addNewGroup(inputTitle,inputDesc)} />
          </div>
        </DialogContent>
       </Dialog>
    </div>

  )
}

export default CreateNewGroup