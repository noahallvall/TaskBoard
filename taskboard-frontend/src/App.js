import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import AddTask from "./Components/AddTask";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("https://localhost:7114/api/task");
                if (!response.ok) throw new Error("Failed to fetch tasks");
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = (newTask) =>
        setTasks((prev) => [...prev, newTask]);

    const handleUpdateTask = (updatedTask) =>
        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );

    const handleDeleteTask = (id) =>
        setTasks((prev) => prev.filter((task) => task.id !== id));

    if (isLoading) return <p className="text-center mt-5">Loading tasks...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">My TaskBoard</h1>
            <AddTask onTaskAdded={handleAddTask} />
            <TaskList
                tasks={tasks}
                onTaskUpdated={handleUpdateTask}
                onTaskDeleted={handleDeleteTask}
            />
        </div>
    );
}

export default App;
