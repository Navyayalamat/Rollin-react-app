import logo from './logo.png';
import './App.css';
import TaskTable from'./Task-Table';
import TaskForm from "./Task-Form"
import { TaskProvider } from './TaskContext';
import { useState } from 'react';

function App() {
  const [editingTask,seteditingTask] = useState(null)
  return (
    <TaskProvider>
        <img src={logo} alt="Logo" className='logo-size' />
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
