import { PrismaClient } from "@prisma/client";
import { defineEventHandler, H3Event } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event:H3Event) => {
    const query = getQuery(event)
    const Id = query.id;

    const where = parseInt(Id as string, 10);


    return await prisma.cards.findUnique({
        where: {
            id: where
        }
    }).then((response) => {
        return response
    })
})