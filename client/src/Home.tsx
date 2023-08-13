import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Interfaces";
import Nav from "./components/Nav";
import { addTaskDb, deleteTaskDb, getAllTasks } from "./api";
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.state?.userId;

    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);
    const [todoList, setTodoList] = useState<ITask[]>([]);

    // Load tasks only once when the page is loaded
    useEffect(() => {
        if (userId === undefined)
            navigate("/login");
        else {
            getAllTasks(userId).then((data) => {
                setTodoList(data);
            });
        }
    }, [userId, navigate]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if (name === "task") {
            setTask(value);
        } else if (name === "deadline") {
            setDeadline(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "priority") {
            setPriority(Number(value));
        }
    }, []);

    const addTask = useCallback((): void => {
        addTaskDb({ userId: userId, name: task, dueDate: deadline, description, priority, completed })
            .then((newTask) => {
                setTodoList((prevTodoList) => [...prevTodoList, newTask]);
                setTask("");
                setDeadline("");
                setDescription("");
                setCompleted(false);
                setPriority(0);
            });
    }, [userId, task, deadline, description, priority, completed]);

    const deleteTask = useCallback((taskId: string): void => {
        deleteTaskDb(taskId).then((isDeleted) => {
            if (isDeleted) {
                setTodoList((prevTodoList) => prevTodoList.filter((task) => task.todoId !== taskId));
                // Remove window.location.reload() to prevent the entire page from reloading
            } else {
                console.log("Failed to delete task.");
                // Display an error message or use toast notifications
            }
        });
    }, []);

    return (
        <div className="App background blue-grey lighten-4">
            <Nav userId={userId} />
            <div className="container">
                <h3 className="white-text center col s12">Please add a task!</h3>
                <div className="header card-panel blue-grey darken-2 z-depth-4">
                    <div className="container center">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                placeholder="Task Name"
                                name="task"
                                value={task}
                                onChange={handleChange}
                                className="validate white-text"
                            />
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    type="date"
                                    name="deadline"
                                    placeholder="Deadline"
                                    value={deadline}
                                    onChange={handleChange}
                                    className="validate white-text datepicker"
                                />
                            </div>
                            <div className="input-field col s6">
                                <input
                                    name="priority"
                                    type="number"
                                    placeholder="Priority"
                                    value={priority}
                                    onChange={handleChange}
                                    className="validate white-text"
                                />
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <input
                                name="description"
                                placeholder="Description"
                                value={description}
                                onChange={handleChange}
                                className="materialize-textarea white-text"
                            />
                        </div>
                        <button className="btn background blue-grey" onClick={addTask}>
                            Add Task
                        </button>
                    </div>
                </div>
                <div className="todoList container center">
                    {todoList.map((task: ITask, key: number) => (
                        <TodoTask key={key} task={task} deleteTask={deleteTask} updateTask={() => console.log("sal")} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
