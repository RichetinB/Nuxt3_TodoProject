import { prisma } from "~/server/db";
import { getUserRooms } from "~/server/db/users_rooms";

export default defineEventHandler(async (event) => {
    const userId = event.context?.auth?.user?.id;
    console.log("i am the userId", userId);

    try {
        const roomsForUser = await getUserRooms(userId);
        console.log(roomsForUser);
        return { roomsForUser };
    } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
});