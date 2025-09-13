import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import AddTask from "./Components/AddTask";
import DeleteTask from "./Components/DeleteTask";
import UpdateTask from "./Components/UpdateTask";

function App() {
    //  App holds the "single source of truth"
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //  Fetch tasks once when App loads test
    useEffect(() => {
        fetch("https://localhost:7114/api/task")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch tasks");
                return response.json();
            })
            .then((data) => {
                setTasks(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    //  Function to add a new task (called by AddTaskForm)
    const AddTask = (newTask) => setTasks((prev) => [...prev, newTask]);

    const UpdateTask = (updatedTask) =>
        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );

    const DeleteTask = (id) =>
        setTasks((prev) => prev.filter((task) => task.id !== id));

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <h1>My TaskBoard</h1>

            {/*  Pass down props for CRUD¨*/}
            <AddTask onTaskAdded={AddTask} />

            <TaskList
                tasks={tasks}
                onTaskUpdated={UpdateTask}
                onTaskDeleted={DeleteTask}
            />

        </div>
    );
}

export default App;
