import React from "react";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    return (
        <div>
           <ul>
                {tasks.map((task) => (

                    <li key={task.id} className="task-item">
                        <div><strong>Title:</strong> {task.title}</div>
                        <div><strong>Description:</strong> {task.description}</div>
                        <div>Status: {task.isDone ? "Done" : "Not Done"}</div>

                        {/* Buttons for update & delete */}
                        <UpdateTask task={task} onTaskUpdated={onTaskUpdated} />
                        <DeleteTask taskId={task.id} onTaskDeleted={onTaskDeleted} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
