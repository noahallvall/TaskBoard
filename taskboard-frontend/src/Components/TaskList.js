import React from "react";
import { Card} from "react-bootstrap";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <Card key={task.id} className="mb-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text> Description: {task.description}</Card.Text>
                        <Card.Text>
                            Status: {task.isDone ? "Done" : task.isPending ? "Started" : "Not Started"}
                        </Card.Text>
                        <div className="d-flex gap-2">
                            <UpdateTask task={task} onTaskUpdated={onTaskUpdated} />
                            <DeleteTask taskId={task.id} onTaskDeleted={onTaskDeleted} />
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default TaskList;
