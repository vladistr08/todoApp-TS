import { getAllTodos } from '../../db/todo'
import { ITodo } from '../../models/todo'

interface IGetAllTodosFilter {
    userId: string
}

interface IGetAllTodosResult {
    items: ITodo[]
}

export default async (_: object, {filter}: {filter: IGetAllTodosFilter}): Promise<IGetAllTodosResult> => {
    try {
        const { userId } = filter
        const result = await getAllTodos(userId)
        return result?.length ? { items: result } : { items: [] }
    }catch (e) {
        throw new Error(`Error in resolver getting all todos ${ e.message }`)
    }
}