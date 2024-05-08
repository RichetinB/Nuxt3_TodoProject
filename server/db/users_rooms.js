import { prisma } from ".";
import { roomTransformer } from "../transformers/rooms";

export const createUserRoom = (userId, roomId) => {
  return prisma.users_Rooms.create({
      data: {
          userId: parseInt(userId), // Convertir userId en entier
          roomId: parseInt(roomId) // Convertir roomId en entier
      }
  
    });
};



export const getRoomsByUserId = (userId) => {
  return prisma.users_Rooms.findMany({
      where: {
          userId: parseInt(userId) 
      },
      include: {
          room: true 
      }
  });
};


  export const getUserRoomById = (userRoomId) => {
    return prisma.users_Rooms.findUnique({
      where: {
        id: userRoomId
      }
    });
  };

  
export const getUserRoomByName = (userRoomName) => {
  return prisma.users_Rooms.findUnique({
    where: {
      name: userRoomName
    }
  });
};

export const getUserRooms = async (userId) => {
  try {
    const userRooms = await prisma.users_Rooms.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: {
          select: {
            id: true,
            name: true, // Vous pouvez inclure d'autres propriétés pertinentes de la salle ici
            // Exemple: description: true, capacity: true, etc.
          }
        },
      },
    });
    return userRooms.map(userRoom => roomTransformer(userRoom.room));
  } catch (error) {
    throw new Error("Erreur lors de la récupération des salles pour l'utilisateur:", error);
  }
};

