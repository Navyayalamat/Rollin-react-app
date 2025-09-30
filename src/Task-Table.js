import {useContext} from 'react';
import { TaskContext } from './TaskContext';
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

const TaskTable = ({seteditingTask}) => {
    const {tasks,deleteTask} = useContext(TaskContext)
    return(
        <div className="row task-table">
            <h3 className="mb-3 white-text">Tasks List</h3>
            <table className="table table-striped table-bordered StandardTable">
                <thead className="yellow-table">
                    <tr>
                        <th>#ID</th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Due Date</th>
                        <th>Completed</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td> {format(new Date(task.created), "dd MMM yyyy")}</td>
                            <td>{format(new Date(task.due), "dd MMM yyyy")}</td>
                            <td>{task.completed.toString()}</td>
                            <td><button className="btn" onClick={()=> seteditingTask(task)}><FaEdit /></button></td>
                            <td><button className="btn" onClick={()=> deleteTask(task.id)}> <FaTrash /></button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TaskTable;