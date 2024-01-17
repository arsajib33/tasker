import { useState } from "react";
import SearchTask from "./SearchTAsk";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskMOdal from "./AddTaskModal";


export default function TaskBoard(){
const [taskToUpdate,setTaskToUpdate]=useState(null)
    const defaultTask={
        'id':crypto.randomUUID(),
        'title':'Learn JavaScript',
        'description':'I have to learn jasva script any how.',
        'tags':['js','react'],
        'priority':'High',
        'isFavorite':true
    }
    const [tasks,setTasks]=useState([defaultTask])
    const [showAddModal,setShowAddModal]=useState(false)

const addTaskHandler=(newTask,isAdd)=>{
if (isAdd) {
  setTasks([
    ...tasks,
  newTask
  ])
}else{
 setTasks(
  tasks.map((task)=>{
    if(task.id===newTask.id){
      return newTask
    }else{
      return task
    }
  })
 )

}

setShowAddModal(false)
setTaskToUpdate(null)

}

const taskEditHandler=(task)=>{
  setTaskToUpdate(task)
  setShowAddModal(true)

}
    return(
<section className="mb-20" id="tasks">
  {showAddModal && <AddTaskMOdal 
    onAddClick={()=> setShowAddModal(false)}
    onSave={addTaskHandler}
    taskToUpdate={taskToUpdate}
    />}
  
  <div className="container">
    {/* Search Box */}
 <SearchTask/>
    {/* Search Box Ends */}
    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
<TaskAction onAddClick={()=> setShowAddModal(true)}/>
<TaskList 
onEdit={taskEditHandler}
tasks={tasks}/>
    </div>
  </div>
</section>


    )
}