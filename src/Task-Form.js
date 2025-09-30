
import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
function TaskForm({editingTask,seteditingTask}){
  const {addTask,updateTask} = useContext(TaskContext);
  const {tasks} = useContext(TaskContext)
  let [edited,setEdited] = useState(false); // changing the form submit button text
  let [completed,setCompleted] = useState(false);
  // Task form initialization
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    due: '',
    created:''
  });

  const [error, setError] = useState('');

  useEffect(()=>{
    // on edit
    if(editingTask){
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
        due: editingTask.due,
        created:editingTask.created
      })
      setCompleted(editingTask.completed)
      setEdited(true);
    }else{
      setEdited(false);
    }
  },[editingTask])

  // On changing form controls
  const handleChange = (e) => {
    if(e.target.name === 'completed'){
      const value = e.target.checked;
      setFormData({ ...formData, [e.target.name]: value });
      setCompleted(value)
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError('');
  };

   // for validations 
   const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.created) return 'Created date is required';
    if (!formData.due) return 'Due date is required';
    if (new Date(formData.due) < new Date(formData.created))
      return 'Due date cannot be before created date';
    if (
      tasks &&
      tasks.some(
        (task) =>
          task.title.toLowerCase() === formData.title.trim().toLowerCase() &&
          (!editingTask || task.id !== editingTask.id)
      )
    )
      return 'Title must be unique';

    return '';
  };

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, formData);
      seteditingTask(null);
    } else {
      addTask(formData);
    }

    setFormData({ title: '', description: '', completed: false, due: '', created: '' });
    setEdited(false);
    setCompleted(false)
    setError('');
  };

  return (
    <div className="row">
        <div className="Task-form-container container mt-5 col-6">
          <h2>Task Added Form</h2>
            <p className="text-danger error-message">
                  {error}
            </p>
          <form onSubmit={handleSubmit} className="mt-6 task-form">
            <div className="row mb-3">
                <label className="col-sm-2 col-form-lab el col-form-label-sm text-start">Task Name<span className='error-message mandatory'>*</span></label>
                <div className="col-sm-6">
                  <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  
                />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-sm text-start">Description<span className='error-message mandatory'>*</span></label>
                <div className="col-sm-6">
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} >
                  </textarea>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-sm text-start">Created<span className='error-message mandatory'>*</span></label>
                <div className="col-sm-6">
                  <input
                  type="date"
                  className="form-control"
                  name="created"
                  placeholder='MM/DD/YY'
                  value={formData.created}
                  onChange={handleChange}
                />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-sm text-start">Due<span className='error-message mandatory'>*</span></label>
                <div className="col-sm-6">
                  <input
                  type="date"
                  className="form-control"
                  name="due"
                  value={formData.due}
                  onChange={handleChange}
                  placeholder='MM/DD/YY'
                  
                />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-sm text-start">Completed {formData.completed}</label>
               <input className="form-check-input ml-10 mt-2" type="checkbox" id="completed"  name="completed" checked={completed} onChange={handleChange}/>
            </div>
          
            <button type="submit" className="btn btn-primary float-start">{edited ? 'Update' : 'Add'}</button>
          </form>
        </div>
    </div>
    
  );
};

export default TaskForm;
