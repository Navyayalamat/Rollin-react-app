import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
    const [tasks,setTasks] = useState([]);
    const url = 'http://localhost:3001/tasks';
    
    // get all tasks
    useEffect(()=>{
     axios.get(url).then(response => {
            console.log(response)
             setTasks(response.data);
          })
    },[]);

    //Add tasks
    const addTask = (task)=>{
        axios.post(url,task)
          .then(response => {
            setTasks([...tasks,response.data])
          })
    }

    //Update tasks
    const updateTask = (id,updatedTask)=>{
       axios.put(`${url}/${id}`,updatedTask).then((res)=>{
            setTasks(
                tasks.map((task)=>
                    task.id === id ? {...task,...updatedTask} : task
                )
            );
       })
    }

    //Delete task
    const deleteTask = (id)=>{
        axios.delete(`${url}/${id}`).then(res => {
          setTasks(tasks.filter((task) => task.id !== id))
        })
    }

    return(
        <TaskContext.Provider 
        value = {{tasks,addTask,updateTask,deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}