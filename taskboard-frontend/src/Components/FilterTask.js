import React from "react";
import TaskList from "./TaskList";

function FilterTask({ tasks, onTaskUpdated, onTaskDeleted }) {
    // Filter tasks by status
    const undoneTasks = tasks.filter(task => !task.isDone);
    const pendingTasks = tasks.filter(task => task.isPending); // if you track pending separately
    const doneTasks = tasks.filter(task => task.isDone);

    return (
        <div className="task-sections">
            {/* UNDONE TASKS */}
            <div className="task-box">
                <h2>Undone Tasks</h2> 

                <TaskList
                    tasks={undoneTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>

            {/* PENDING TASKS */}
            <div className="task-box">
                <h2>Pending Tasks</h2>

                <TaskList
                    tasks={pendingTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>

            {/* DONE TASKS */}
            <div className="task-box">
                <h2>Done Tasks</h2>

                <TaskList
                    tasks={doneTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>
        </div>
    );
}

export default FilterTask;
