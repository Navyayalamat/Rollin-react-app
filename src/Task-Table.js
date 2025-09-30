import {useContext} from 'react';
import { TaskContext } from './TaskContext';

const TaskTable = ({seteditingTask}) => {
    const {tasks,deleteTask} = useContext(TaskContext)
    return(
        <div className="row task-table">
            <h2 className="mb-3">Tasks List</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Due</th>
                        <th>Completed</th>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.created}</td>
                            <td>{task.due}</td>
                            <td>{task.completed.toString()}</td>
                            <td><button className="btn btn-primary btn-sm" onClick={()=> seteditingTask(task)}>Edit</button></td>
                            <td><button className="btn btn-primary btn-sm" onClick={()=> deleteTask(task.id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TaskTable;