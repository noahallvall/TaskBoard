import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddTask({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = async () => {
        if (!title || !description) return;
        const newTask = { title, description, isDone: false };
        try {
            const res = await fetch("https://localhost:7114/api/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });
            if (!res.ok) throw new Error("Failed to add task");
            const data = await res.json();
            onTaskAdded(data);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form className="d-flex gap-2 mb-3">
            <Form.Control
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Control
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Button variant="success" onClick={handleAdd}>Add Task</Button>
        </Form>
    );
}

export default AddTask;
