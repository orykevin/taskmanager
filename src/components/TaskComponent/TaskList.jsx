import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';
import { deleteRequest, postRequest } from '../../function/getPost';


function TaskList({ tasks, setTasks, index, groupLength, groupData, getAllTodos, getAllTask }) {

  const auth_token = import.meta.env.VITE_TOKEN
  

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
  const deleteTask = (taskData,apiURL) => {
    const apiURLDel = `${import.meta.env.VITE_API_URL}todos/${taskData.todo_id}/items/${taskData.id}`
    deleteRequest(apiURLDel,auth_token).then(()=>{
        addNewTask(taskData.name,taskData.progress_percentage,apiURL)
    })
  }

  const handleOnDrop = (taskData,target) =>{
    const apiURLAdd = `${import.meta.env.VITE_API_URL}todos/${groupData[target].id}/items`
    deleteTask(taskData,apiURLAdd)
  }


  const [{canDrop, isOver}, drop] = useDrop({
    accept: 'ITEM', // The type of item that can be dropped on this area
    drop: (item,monitor) => {
      console.log(item)
      const targetIndex = index
      console.log(targetIndex)
      handleOnDrop(item,targetIndex)
    }, // Callback function when item is dropped
  });

  return (
    <div ref={drop}>
      {tasks.length > 0 ? (
        tasks.map((task, i) => (
          <TaskCard
            data={task}
            setTasks={setTasks}
            tasks={tasks}
            i={i}
            indexGroup={index}
            groupLength={groupLength}
            groupData={groupData}
            getAllTodos={getAllTodos}
            getAllTask={getAllTask}
            key={task.id}
          />
        ))
      ) : (
        <div className='emptyTaskContainer'>
          <h4>No Task</h4>
        </div>
      )}
    </div>
  );
}

export default TaskList;