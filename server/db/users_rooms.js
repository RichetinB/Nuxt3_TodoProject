import { prisma } from ".";

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