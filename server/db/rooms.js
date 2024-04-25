import { prisma } from ".";

export const createRoom = (roomData) => {
    return prisma.rooms.create({
        data: roomData
    });
}

export const getRoomById = (roomId) => {
    return prisma.rooms.findUnique({
        where: {
            id: roomId
        }
    });
}

export const getRoomByName = (roomName) => {
    return prisma.rooms.findUnique({
        where: {
            name: roomName
        }
    });
}
