import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = (userData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    return prisma.user.create({
        data: finalUserData
    })
}


export const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Error fetching user by username');
    }
}


export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where:{
            id: userId
        }
    })
}



export const updateUser = (userId, userData) => {
    try {
      const updatedUser = prisma.user.update({
        where: { id: userId },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  };
  