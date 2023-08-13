import {createUser} from "../../db/user";

interface IUserInput{
    username: string
    password: string
    email?: string
}

interface IUserResult{
    userId: string | undefined
}

export default async (_: object, {input}: {input: IUserInput}): Promise<IUserResult> => {
    try {
        const userId = await createUser({
            username: input.username,
            password: input.password,
            email: input?.email
        })
        return {userId: userId}
    }catch (e) {
        throw new Error(`Resolver error creating user ${e.message}`)
    }
}