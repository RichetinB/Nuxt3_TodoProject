import { getRoomsCreatedByUser } from "~/server/db/users_rooms";


export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.params
        if (!userId) {
            throw new Error("User ID is missing in request headers");
        }

        const rooms = await getRoomsCreatedByUser(userId);

        return {
            body: {
                rooms
            }
        };
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to fetch rooms' }));
    }
});
