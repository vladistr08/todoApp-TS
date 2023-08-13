import {addTodo} from '../../db/todo'

interface IAddTodoInput {
    userId: string
    name: string
    description?: string
    completed?: boolean
    priority?: number
    dueDate?: string
}

interface IAddTodoResult {
    todoId: string | undefined
}

export default async (_: object, { input }: { input: IAddTodoInput }): Promise<IAddTodoResult> => {
    try {
        const todoId = await addTodo({...input})
        return {todoId: todoId}
    }catch (e) {
        throw new Error(`Error while adding todo in resolver ${e.message}`)
    }
}