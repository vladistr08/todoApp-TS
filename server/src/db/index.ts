import mongoose from 'mongoose'

import env from '../config/env'

export const connectToDatabase = async (): Promise<void> => {
    try{
        await mongoose.connect(env.MONGO_CONNECTION_URL)
        console.log('Connected to the db...')
    }catch (e) {
        console.log(`Error connecting to db... ${e?.message}`)
    }
}