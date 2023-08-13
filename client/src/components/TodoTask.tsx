import React from "react";
import { ITask } from "../Interfaces";

interface Props {
    task: ITask;
    deleteTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, deleteTask }: Props) => {
    return (
        <div className="container section">
            <div className="row hoverable deep-orange darken-3">
                <div className="col s8">
                    <p className="text-darken-4 ">{task.taskName}</p>
                </div>
                <div className="col s2 background">
                    <p className="text-darken-4">{task.deadline}</p>
                </div>
                <div className="col s2 center">
                    <button
                        className="waves-effect btn-flat large"
                        onClick={() => {
                            deleteTask(task.taskId);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="col s12 center deep-orange darken-2">
                    <p>{task.description}</p>
                </div>
                <div className="col s6 right-align">
                    <p>Priority: {task.priority}</p>
                </div>
                <div className="col s6 left-align">
                    <p>
                        <label>
                            <input type="checkbox" onChange={(e) => task.completed = e.target.checked}/>
                            <span className="black-text">Done?</span>
                        </label>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TodoTask;