import React, { useEffect, useState } from 'react'
import ProgressCount from './ProgressCount'
import dotIcon from '../../assets/dot.svg'
import "../../styles/taskCard.scss"
import DialogMenu from './DialogMenu'
import DeleteTask from '../Modal/DeleteTask'
import EditTask from '../Modal/EditTask'
import { useDrag } from 'react-dnd'


function TaskCard({data,setTasks,tasks,i,indexGroup,groupLength,groupData,getAllTodos,getAllTask}) {
  const [{isDragging}, drag] = useDrag({
    type: 'ITEM',
    item: tasks[i], 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [showDialog,setShowDialog] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [showModal2,setShowModal2] = useState(false)
  const [taskData,setTaskData] = useState(tasks[i])

  const handleCloseDialog = () =>{
    setShowDialog(false)
  }

  useEffect(()=>{
  },[groupData[indexGroup]])

  return (
    <div className='taskCard' ref={drag} style={{cursor:"move"}}>
      <h4>{tasks[i].name}</h4>
        <div className='taskInfoContainer'>
            <ProgressCount percent={tasks[i].progress_percentage} />
            <img src={dotIcon} alt="setting-icon" className='settingButton' onClick={()=>setShowDialog(!showDialog)} />
        </div>
      {showDialog && <DialogMenu setShowModal={setShowModal} setShowModal2={setShowModal2} handleClose={handleCloseDialog} setShowDialog={setShowDialog} indexGroup={indexGroup} groupLength={groupLength} groupData={groupData} taskData={taskData} getAllTodos={getAllTodos} getAllTask={getAllTask} />}
      {showModal && <DeleteTask setShowModal={setShowModal} showModal={showModal} data={data} tasks={tasks} setTasks={setTasks} i={i}  />}
      {showModal2 && <EditTask setShowModal={setShowModal2} showModal={showModal2} tasks={tasks} setTasks={setTasks} i={i} taskData={taskData}/>}
    </div>
  )
}

export default TaskCard