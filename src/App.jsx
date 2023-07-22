import { useEffect, useState } from 'react'
import './styles/App.scss'
import { getRequest , postRequest } from './function/getPost'
import GroupTaskCard from './components/GroupTaskCard'
import plusIcon from "./assets/plusIcon.svg"
import CreateNewGroup from './components/Modal/CreateNewGroup'
import ButtonBox from './components/reuseableComp/ButtonBox'
import {CardColor} from "./data/AllColor"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {

  const [showCreate,setShowCreate] = useState(false)
  const [groupData,setGroupData] = useState([])

  const auth_token = import.meta.env.VITE_TOKEN
  const apiURL = `${import.meta.env.VITE_API_URL}todos`

  const getColor = (index) =>{
    let i = index % 4
    if(i == 1) return CardColor[0]
    if(i == 2) return CardColor[1]
    if(i == 3) return CardColor[2]
    if(i == 0) return CardColor[3]
}

  const getAllTodos = async () => {
    getRequest(apiURL, {} , auth_token).then(data => {
      setGroupData(data)
    }).catch((error)=>{
      console.log(error)
      throw error
    });
  }

  useEffect(()=>{
    getAllTodos()
  },[])

  useEffect(()=>{
  },[groupData])

  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <div className='header'>
        <h1>Product Roadmap</h1>
        <ButtonBox text="+ Add New Group" bgColor="#01959F" fontSize="12px" funcClick={()=>setShowCreate(true)}/>
      </div>
      
      <div className='allGroupContainer'>
        {groupData.length > 0 && groupData.map((group,index)=>{
          return  <GroupTaskCard groupTitle={group.title} groupDesc={group.description} index={index} id={group.id} groupLength={groupData.length} groupData={groupData} getAllTodos={getAllTodos} key={group.id} color={getColor(index+1)}  />
        })}
        
      </div>
      
      <CreateNewGroup showCreate={showCreate} setShowCreate={setShowCreate} groupData={groupData} setGroupData={setGroupData} />
    </div>
    </DndProvider>
  )
}

export default App
