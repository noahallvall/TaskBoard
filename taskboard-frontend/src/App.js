import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import AddTask from "./Components/AddTask";

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
    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <h1>My TaskBoard</h1>

            {/*  Pass down props */}
            <AddTask onTaskAdded={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
}

export default App;
