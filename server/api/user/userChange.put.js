// API route
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";


export default defineEventHandler(async(event) => {
    try {
        const body = await readBody(event)
        
        const hashedPassword = bcrypt.hashSync(body.password, 10);
    
        const userData = {
            id: body.id, 
            name: body.name,
            email: body.email,
            username: body.username,
            password: hashedPassword
        };
        
        const updatedUser = await prisma.user.update({
            where: { id: userData.id },
            data: userData
        });

        return updatedUser;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données utilisateur :", error);
        throw new Error("Erreur lors de la mise à jour des données utilisateur");
    }
});
