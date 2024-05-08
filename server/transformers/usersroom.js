import { userTransformer } from "./users"
import { roomTransformer } from "./rooms"

export const usersRoomsTransformer = (usersRooms) => {
    return {
        id: usersRooms.id,
        user: !!usersRooms.user ? userTransformer(usersRooms.user) : null,
        room: !!usersRooms.room ? roomTransformer(usersRooms.room) : null
    }
}
