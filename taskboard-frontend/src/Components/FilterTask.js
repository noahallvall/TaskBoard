import React from "react";
import TaskList from "./TaskList";

function FilterTask({ tasks, onTaskUpdated, onTaskDeleted }) {
    // Filter tasks by status
    const undoneTasks = tasks.filter(task => !task.isDone && !task.isPending);
    const pendingTasks = tasks.filter(task => task.isPending && !task.isDone);
    const doneTasks = tasks.filter(task => task.isDone);


    return (
        <div className="task-sections">

            {/* UNDONE TASKS */}
            <div className="task-box undone">
                <h2>Undone</h2>
                <TaskList
                    tasks={undoneTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>

            {/* PENDING TASKS */}
            <div className="task-box pending">
                <h2>Pending</h2>
                <TaskList
                    tasks={pendingTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>

            {/* DONE TASKS */}
            <div className="task-box done">
                <h2>Finished</h2>
                <TaskList
                    tasks={doneTasks}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            </div>

        </div>

        )

}

export default FilterTask;
