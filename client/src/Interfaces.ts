export interface ITask {
    todoId: string
    userId?: string
    name: string
    dueDate: string
    description: string
    priority: number
    completed: boolean
}