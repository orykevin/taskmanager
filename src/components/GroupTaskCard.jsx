import React, { useEffect, useState, useContext } from 'react'
import TaskCard from './TaskComponent/TaskCard'
import "../styles/taskCard.scss"
import plusIcon from "../assets/plusRoundIcon.svg"
import CreateNewTask from './Modal/CreateNewTask'
import { getRequest } from '../function/getPost'

function GroupTaskCard({groupDesc,index,id,groupLength,groupData,getAllTodos,color}) {

  const [showCreate,setShowCreate] = useState(false)
  const [tasks,setTasks] = useState([])

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos/${id}/items`

  const getAllTask = async () => {
    getRequest(apiURL, {}, auth_token ).then((data)=>{
      setTasks(data)
      setShowCreate(false)
    }).catch((error)=>{
      console.log(error)
      throw(error)
    })
  }

  useEffect(()=>{
    getAllTask()
  },[])

  useEffect(()=>{
    getAllTask()
  },[groupData[index]])




  return (
    <div className='groupTaskCard' style={{border: `2px solid ${color?.main}`,background:`${color?.second}10`}}>
      <span className='groupTitle' style={{color: color?.main,border: `1px solid ${color?.second}`}} >{groupData[index].title}</span>
      <p>{groupDesc}</p>
      {tasks.length > 0 ? tasks.map((task,i)=>{
        return <TaskCard data={task} setTasks={setTasks} tasks={tasks} i={i} indexGroup={index} groupLength={groupLength} groupData={groupData} getAllTodos={getAllTodos} getAllTask={getAllTask} key={task.id}/> 
      }) :
      <div className='emptyTaskContainer'>
        <h4>No Task</h4>
      </div>
      }
      <div className='newTaskContainer' onClick={()=>setShowCreate(true)}>
        <img src={plusIcon} />
        <p>New Task</p>
      </div>
      <CreateNewTask showCreate={showCreate} setShowCreate={setShowCreate} tasks={tasks} setTasks={setTasks} id={id} getAllTask={getAllTask} />
    </div>
  )
}

export default GroupTaskCard