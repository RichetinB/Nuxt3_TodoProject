import { sendError } from "h3";
import { createUserRoom } from "~/server/db/users_rooms"; 
import { createRoom } from "~/server/db/rooms";
import { roomTransformer } from "~/server/transformers/rooms";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, userId } = body;

  if (!name || !userId) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }));
  }

  try {
    
    const roomData = { name };
    const room = await createRoom(roomData);

    await createUserRoom(userId, room.id); 

    return {
      body: roomTransformer(room)
    };
  } catch (error) {
    console.error('Error creating room:', error);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to create room' }));
  }
});
