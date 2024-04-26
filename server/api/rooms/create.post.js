import { sendError } from "h3";
import { createUserRoom } from "~/server/db/users_rooms"; 
import { createRoom } from "~/server/db/rooms";
import { roomTransformer } from "~/server/transformers/rooms";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name} = body;

  if (!name) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }));
  }

  try {
    // Créer la room
    const roomData = { name };
    const room = await createRoom(roomData);

    // Créer la relation utilisateur-salle
    // await createUserRoom(userId, room.id); // Correction ici

    return {
      body: roomTransformer(room)
    };
  } catch (error) {
    console.error('Error creating room:', error);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to create room' }));
  }
});
