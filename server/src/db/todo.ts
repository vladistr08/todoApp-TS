import {ITodo, Todo} from '../models/todo'

export const getAllTodos = async (userId: string): Promise<ITodo[]> => {
    try {
        return await Todo.find({userId: userId}).exec()
    }catch (e) {
        throw new Error(`Error getting all todos ${e.message}`)
    }
}

export const updateTodo = async (todoId: string, props: Partial<ITodo>): Promise<ITodo | null> => {
    try {
        await Todo.findOneAndUpdate({todoId: todoId}, {...props})
        return await Todo.findOne({todoId: todoId})
    }catch (e) {
        throw new Error(`Error updating todos ${e.message}`)
    }
}

export const addTodo = async (todo: ITodo): Promise<string | undefined> => {
    try {
        const {todoId} = await Todo.create(todo)
        return todoId?.toString()
    }catch (e) {
        throw new Error(`Error creating todo ${e.message}`)
    }
}

export const deleteTodo = async (todoId: string): Promise<boolean> => {
    try{
        const {deletedCount} = await Todo.deleteOne({todoId: todoId})
        return deletedCount > 0
    }catch (e) {
        throw new Error(`Error deleting todo ${e.message}`)
    }
}

export const getTodoIdByName = async (userId: string, todoName: string): Promise<string | undefined> => {
    try {
        const result = await Todo.find({userId: userId, name: todoName}).exec()
        return result[0].todoId?.toString()
    }catch (e) {
        throw new Error(`Error getting todo by name ${e.message}`)
    }
}

export const getTodoById = async (todoId: string): Promise<ITodo | null> => {
    try{
        return await Todo.findOne({todoId: todoId})
    }catch (e) {
        throw new Error(`Error getting todo by id ${e.message}`)
    }
}