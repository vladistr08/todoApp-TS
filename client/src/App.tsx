import React, { FC, ChangeEvent, useState } from "react";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Interfaces";
import Nav from "./components/Nav";

const App: FC = () => {
    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [priority, setPriority] = useState<number>(0)
    const [completed, setCompleted] = useState<boolean>(false)

    const [todoList, setTodoList] = useState<ITask[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task") {
            setTask(event.target.value);
        } else if (event.target.name === "deadline") {
            setDeadline(event.target.value);
        }
        else if(event.target.name === "description"){
            setDescription(event.target.value)
        }
        else if(event.target.name === "priority"){
            setPriority(Number(event.target.value))
        }
    };

    const addTask = (): void => {
        const newTask = { taskId: (todoList.length + 1).toString(), taskName: task, deadline: deadline, description: description, priority: priority, completed: completed };
        setTodoList([...todoList, newTask]);
        setTask("");
        setDeadline("");
        setDescription("")
        setCompleted(false)
        setPriority(0)
    };

    const deleteTask = (taskId: string): void => {
        console.log(taskId)
        setTodoList(
            todoList.filter((task) => {
                return task.taskId != taskId;
            })
        );
    };



    return (
        <div className="App background deep-orange lighten-2">
            <Nav/>
            <div className="row">

            </div>
            <div className="row">

            </div>
            <div className="header deep-orange darken-3 container z-depth-4">
                <div className="container center">
                    <input
                        type="text"
                        placeholder="Task Name..."
                        name="task"
                        value={task}
                        onChange={handleChange}
                    />
                    <div className="row">
                        <input
                            type="date"
                            name="deadline"
                            className="col s6 datepicker"
                            placeholder="Enter the deadline in format xxxx-xx-xx..."
                            value={deadline}
                            onChange={handleChange}
                        />
                        <div className="col s1"></div>
                        <input
                            name="priority"
                            type="number"
                            className="col s5 left"
                            placeholder="Priority level"
                            value={priority}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="text"
                        name="description"
                        placeholder="Enter a description..."
                        value={description}
                        onChange={handleChange}
                    />
                    <button className="btn background amber" onClick={addTask}>Add Task</button>
                    <div className="row "></div>
                    <div className="row "></div>
                </div>
            </div>
            <div className="todoList container center">
                {todoList.map((task: ITask, key: number) => {
                    return <TodoTask key={key} task={task} deleteTask={deleteTask} />;
                })}
            </div>
        </div>
    );
};

export default App;