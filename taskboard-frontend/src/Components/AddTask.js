import React, { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) => setIsDone(e.target.checked)}
                    />
                    Done
                </label>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTask;