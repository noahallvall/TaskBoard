import React from "react";

function DeleteTask({ taskId, onTaskDeleted }) {
    const handleDelete = () => {
        fetch(`https://localhost:7114/api/task/${taskId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete task");
                onTaskDeleted(taskId);
            })
            .catch((err) => console.error(err));
    };

    return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteTask;
