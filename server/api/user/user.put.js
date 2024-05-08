import { prisma } from "~/server/db";

export default defineEventHandler(async(event) => {
    try {
        const body = await readBody(event)

        const userData = {
            name: body.name
          };
        const userId = event.context?.auth?.user?.id
        console.log("je suis userId", userId)


        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: userData,
        });

        return updatedUser;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données utilisateur :", error);
        throw new Error("Erreur lors de la mise à jour des données utilisateur");
    }
});
