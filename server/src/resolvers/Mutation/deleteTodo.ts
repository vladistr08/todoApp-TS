import {deleteTodo} from '../../db/todo'

interface IDeleteTodoFilter{
    todoId: string
}

export default async (_: object, {filter}: {filter: IDeleteTodoFilter}): Promise<boolean> => {
    try {
        const {todoId} = filter
        return await deleteTodo(todoId)
    }catch (e) {
        throw new Error(`Error deleting todo ${e.message}`)
    }
}