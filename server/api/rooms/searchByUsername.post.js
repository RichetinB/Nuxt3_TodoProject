import { getUserByUsername } from "~/server/db/users";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { username } = body;

        const user = await getUserByUsername(username);

        if (user) { 
            return { user };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur par nom d'utilisateur :", error);
        throw new Error("Erreur lors de la recherche de l'utilisateur par nom d'utilisateur.");
    }
});