import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateTask({ task, onTaskUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [isDone, setIsDone] = useState(task.isDone);

    const handleUpdate = async () => {
        const updatedTask = { ...task, title, description, isDone };
        try {
            const res = await fetch(`https://localhost:7114/api/task/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            if (!res.ok) throw new Error("Failed to update task");
            const data = await res.json();
            onTaskUpdated(data);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return isEditing ? (
        <Form className="d-flex flex-column gap-2">
            <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <Form.Check
                type="checkbox"
                label="Done"
                checked={isDone}
                onChange={e => setIsDone(e.target.checked)}
            />
            <div className="d-flex gap-2">
                <Button variant="success" size="sm" onClick={handleUpdate}>Save</Button>
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
        </Form>
    ) : (
        <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
    );
}

export default UpdateTask;
