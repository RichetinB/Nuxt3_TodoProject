// API route pour récupérer une chambre par ID
import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
    try {

        const { id } = event.context.params;

        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(id) 
            }
        });

        // Vérifier si la chambre a été trouvée
        if (!room) {
            throw new Error("La chambre n'a pas été trouvée");
        }

        // Retourner la chambre trouvée
        return room;
    } catch (error) {
        console.error("Erreur lors de la récupération de la chambre :", error);
        throw new Error("Erreur lors de la récupération de la chambre");
    }
});
