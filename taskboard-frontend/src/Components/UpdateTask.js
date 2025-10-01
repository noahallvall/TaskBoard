import React, { useState } from "react";

function UpdateTask({ task, onTaskUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [isDone, setIsDone] = useState(task.isDone);
    const [isPending, setIsPending ] = useState(task.isPending);

    const handleUpdate = () => {
        const updatedTask = { ...task, title, description, isDone, isPending };

        fetch(`https://localhost:7114/api/task/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update task");
                return res.json();
            })
            .then((data) => {
                onTaskUpdated(data);
                setIsEditing(false);
            })
            .catch((err) => console.error(err));
    };

    return isEditing ? (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>
                <input
                    type="checkbox"
                    checked={isPending}
                    onChange={(e) => setIsPending(e.target.checked)}
                />
                Started not finished
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={(e) => setIsDone(e.target.checked)}
                />
                Finished!
            </label>

            <button onClick={handleUpdate}>Save</button>

            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
    );
}

export default UpdateTask;
