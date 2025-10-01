import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddTask({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isDone, setIsDone] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            title: title,
            description: description,
            isDone: isDone
        };

        fetch("https://localhost:7114/api/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create task");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Task created:", data);
                if (onTaskAdded) {
                    onTaskAdded(data); // Let parent component update task list
                }
                setTitle("");
                setDescription("");
                setIsDone(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>What task needs to be done?</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Title"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description"
                />
            </Form.Group>


            <Button type="submit" variant="primary">
                Add Task
            </Button>
        </Form>
    );
}


export default AddTask;