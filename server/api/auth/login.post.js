import { getUserByUsername } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt"
import { userTransformer } from "~/server/transformers/users"
import { createRefreshToken } from "~/server/db/refreshTokens"
import {sendError} from "h3"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const {username, password} = body

    if(!username || !password){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid Params'
        }))
    }

    const user = await getUserByUsername(username)

    if(!user){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'username or password is invalide'
        }))
    }


    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'username or password is invalide'
        }))
    }

    const {accessToken, refreshToken} = generateTokens(user)


    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        access_Token:accessToken,
        user: userTransformer(user)
    }

})