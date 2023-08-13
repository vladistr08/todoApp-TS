import {updateTodo} from '../../db/todo'
import {ITodo} from '../../models/todo'

interface IUpdateProps{
    name?: string
    completed?: boolean
    description?: string
    dueDate?: string
    priority?: number
}

interface IUpdateTodoInput {
    todoId: string
    props: IUpdateProps
}

export default async (_: object, {input}: {input: IUpdateTodoInput}): Promise<ITodo | null> => {
    try {
        const {todoId, props} = input
        return await updateTodo(todoId, props)
    }catch (e) {
        throw new Error(`Error updating todo ${e.message}`)
    }
}