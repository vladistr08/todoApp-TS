export interface ITask {
    taskId: string
    userId?: string
    taskName: string
    deadline: string
    description: string
    priority: number
    completed: boolean
}