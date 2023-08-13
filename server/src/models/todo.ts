import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface ITodo {
    todoId?: Schema.Types.UUID | string
    userId: Schema.Types.UUID | string
    name: string
    completed?: boolean
    description?: string
    dueDate?: string
    priority?: number
}

export const TodoSchema: Schema<ITodo> = new Schema({
    todoId: {type: Schema.Types.UUID, default: () => uuidv4(), unique: true},
    userId: {type: Schema.Types.UUID, required: true, ref: 'User'},
    name: {type: String, required: true, unique: true},
    completed: {type: Boolean, default: false},
    description: String,
    dueDate: String,
    priority: Number
})

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema, 'todos')