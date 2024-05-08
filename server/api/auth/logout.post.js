import { removeRefreshToken } from "~~/server/db/refreshTokens"
import { sendRefreshToken } from "~~/server/utils/jwt"

// Dans votre gestionnaire d'événements
export default defineEventHandler(async (event, res) => {
    try {
        const cookies = useCookies(event)
        const refreshToken = cookies.refresh_token
        await removeRefreshToken(refreshToken)
    } catch (error) { }

    sendRefreshToken(res, null)

    return { message: 'Done' }
})
