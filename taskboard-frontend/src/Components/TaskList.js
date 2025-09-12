import React from "react";

function TaskList({ tasks }) {
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong>: {task.description}{" "}
                        [{task.isDone ? "Done" : "Not Done"}]
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
