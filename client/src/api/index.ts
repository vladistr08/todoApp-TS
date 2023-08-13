import axios from 'axios';
import { ITask } from "../Interfaces";

const graphqlApiString = "http://localhost:9330/graphql"

export const getAllTasks = async (userId: string): Promise<ITask[]> => {
    try {
        const httpResponse = await axios.post(graphqlApiString, {
            query: `query getAllTodos($filter: getAllTodosFilter!) {
                        getAllTodos(filter: $filter) {
                          items {
                            todoId
                            userId
                            name
                            description
                            priority
                            completed
                            dueDate
                          }
                        }
                  }`,
            variables:{
                filter: {
                    userId: userId
                }
            }
        });

        const { data } = httpResponse;
        console.log(httpResponse);

        if (data.errors?.length) {
            throw new Error('Error while fetching all tasks');
        }

        return data.data.getAllTodos.items;
    } catch (error) {
        console.error('Error in getAllTasks:', error);
        throw error;
    }
};

export const addTaskDb = async (task: Omit<ITask, 'todoId'>): Promise<ITask> => {
    try {
        const httpResponse = await axios.post(graphqlApiString, {
            query: `
                    mutation addTodo($todoInput: addTodoInput!) {
                      addTodo(input: $todoInput) {
                        todoId
                      }
                    }
                  `,
            variables: {
                todoInput: { ...task }
            }
        });

        const { data } = httpResponse;
        console.log(httpResponse);

        if (data.errors?.length) {
            throw new Error('Error while adding the task');
        }

        return { todoId: data.data.addTodo.todoId, ...task };
    } catch (error) {
        console.error('Error in addTaskDb:', error);
        throw error;
    }
};

export const deleteTaskDb = async (taskId: string): Promise<boolean> => {
    try {
        console.log(taskId)
        const httpResponse = await axios.post(graphqlApiString, {
            query: `mutation deleteTodo($filter: deleteTodoFilter!) {
                      deleteTodo(filter: $filter)
                    }`
            ,
            variables: {
                filter: {
                    todoId: taskId
                }
            }
        });

        const { data } = httpResponse;

        if (data.errors?.length) {
            throw new Error('Error while deleting the task');
        }

        return data.data.deleteTodo;
    } catch (error) {
        console.error('Error in deleteTaskDb:', error);
        throw error;
    }
};

export const loginUser = async (username: string, password: string): Promise<string | undefined> => {
    try {
        const httpResponse = await axios.post(graphqlApiString, {
            query: `
                query loginUser($input: loginUserInput!){
                  loginUser(input: $input){
                    user{
                      userId
                      username
                      password
                      email
                    }
                  }
                }
      `,
            variables: {
                input: {
                    username: username,
                    password: password
                }
            }
        });

        const { data } = httpResponse.data;

        if (data.errors?.length) {
            throw new Error('Error while loggin the task');
        }

        return data.loginUser.user ? data.loginUser.user.userId: undefined
    } catch (error) {
        console.error('Error in login user:', error);
        throw error;
    }
};

export const registerUser = async (username: string, password: string, email: string): Promise<string | undefined> => {
    try {
        const httpResponse = await axios.post(graphqlApiString, {
            query: `
                mutation createUser($input: createUserInput!){
                    createUser(input: $input){
                        userId
                    }
                }
            `,
            variables: {
                input: {
                    username: username,
                    password: password,
                    email: email
                }
            }
        })
        const { data } = httpResponse.data;

        if (data.errors?.length) {
            throw new Error('Error while creating user');
        }

        return data.createUser ? data.createUser.userId: undefined
    }catch (e) {
        console.log('Error at register', e)
        throw e
    }
}

