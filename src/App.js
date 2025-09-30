import logo from './logo.svg';
import './App.css';
import TaskTable from'./Task-Table';
import TaskForm from "./Task-Form"
import { TaskProvider } from './TaskContext';
import { useState } from 'react';

function App() {
  const [editingTask,seteditingTask] = useState(null)
  return (
    <TaskProvider>
        <div className="App">
          <TaskForm
          editingTask={editingTask}
          seteditingTask={seteditingTask}
          />
          <TaskTable seteditingTask={seteditingTask}/>
        </div>
    </TaskProvider>
    
  );
}

export default App;
