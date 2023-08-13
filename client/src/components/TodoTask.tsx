import React, { ChangeEvent, useState } from "react";
import { ITask } from "../Interfaces";

interface Props {
    task: ITask;
    updateTask(task: ITask): void;
    deleteTask(taskId: string): void;
}

const TodoTask = ({ task, updateTask, deleteTask }: Props) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState<ITask>({ ...task });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            completed: !prevTask.completed,
        }));
    };

    const handleSave = () => {
        updateTask(editedTask);
        setEditing(false);
    };

    return (
        <div className="container section">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">
                        {editing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedTask.name}
                                onChange={handleInputChange}
                                className="validate white-text"
                            />
                        ) : (
                            task.name
                        )}
                    </span>
                    <p>
                        <b>Deadline:</b> {editing ? (
                        <input
                            type="text"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleInputChange}
                            className="validate white-text"
                        />
                    ) : (
                        task.dueDate
                    )}
                    </p>
                    <p>
                        <b>Priority:</b>{" "}
                        {editing ? (
                            <input
                                type="number"
                                name="priority"
                                value={editedTask.priority}
                                onChange={handleInputChange}
                                className="validate white-text"
                            />
                        ) : (
                            task.priority
                        )}
                    </p>
                    <div className="row"></div>

                    {/* ... Other fields */}
                    <p>
                        <b>Description:</b>{" "}
                        <div className="col s12"  style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                            {editing ? (
                                <textarea
                                    name="description"
                                    value={editedTask.description}
                                    onChange={handleInputChange}
                                    className="materialize-textarea white-text"
                                    style={{ minHeight: "10em", overflowY: "auto" }}
                                />
                            ) : (
                                <p className="blue-grey darken-2">{task.description}</p>
                            )}
                        </div>
                    </p>




                    {/* ... Other fields */}

                    <div className="row"></div>

                    <p>
                        {editing ? (
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editedTask.completed}
                                        onChange={handleCheckboxChange}
                                        disabled={!editing}
                                    />
                                    <span className="white-text">Done?</span>
                                </label>


                        ) : (
                            <div><b>Completed:</b>{" "} <span>{task.completed ? "Yes" : "No"}</span></div>
                        )}
                    </p>


                </div>

                <div className="card-action">
                    {editing ? (
                        <>
                            <button
                                className="btn waves-effect waves-light blue-grey darken-3"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="btn waves-effect waves-light red"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn waves-effect waves-light blue-grey darken-3"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn waves-effect waves-light red"
                                onClick={() => deleteTask(task.todoId)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoTask;
