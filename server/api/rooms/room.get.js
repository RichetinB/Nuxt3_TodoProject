import { roomTransformer } from "~/server/transformers/rooms"

export default defineEventHandler(async (event) => {

    return {
        user: roomTransformer(event.context.auth?.room)
    }

})