import React from "react";
import Button from 'react-bootstrap/Button';

function DeleteTask({ taskId, onTaskDeleted }) {
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await fetch(`https://localhost:7114/api/task/${taskId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete task");
            onTaskDeleted(taskId);
        } catch (err) {
            console.error(err);
        }
    };

    return <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>;
}

export default DeleteTask;
