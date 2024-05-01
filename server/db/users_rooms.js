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



export const getRoomsCreatedByUser = async (userId) => {
  try {
    const userRooms = await prisma.users_Rooms.findMany({
      where: {
        userId: userId
      },
      include: {
        room: true 
      }
    });

    return userRooms.map(userRoom => userRoom.room);
  } catch (error) {
    throw new Error(`Error fetching rooms for user ${userId}: ${error.message}`);
  }
};