import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { userId, roomId } = body;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const room = await prisma.rooms.findUnique({
            where: { id: parseInt(roomId) }
        });

        if (!user || !room) {
            throw new Error("L'utilisateur ou la salle n'existe pas.");
        }

        const inviteUser = await prisma.users_Rooms.create({
            data: {
                userId: userId,
                roomId: parseInt(roomId)
            }
        });

        return { success: true, message: "L'utilisateur a été ajouté à la salle avec succès.", inviteUser };
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur à la salle :", error);
        throw new Error("Erreur lors de l'ajout de l'utilisateur à la salle.");
    }
});
