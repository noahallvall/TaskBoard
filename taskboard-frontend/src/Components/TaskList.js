import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    return (
        <div className="mt-4">
            <h2 className="mb-3">Task List</h2>
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item
                        key={task.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>{task.title}</strong>: {task.description}
                            <span className={`ms-2 badge ${task.isDone ? 'bg-success' : 'bg-warning'}`}>
                                {task.isDone ? "Done" : "Not Done"}
                            </span>
                        </div>
                        <div>
                            <UpdateTask task={task} onTaskUpdated={onTaskUpdated} />
                            <DeleteTask taskId={task.id} onTaskDeleted={onTaskDeleted} className="ms-2" />
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default TaskList;
