import { PrismaClient } from "@prisma/client";
import { defineEventHandler, H3Event } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event:H3Event) => {
    const query = getQuery(event)
    const Id = query.card;

    const where = parseInt(Id as string, 10);


    return await prisma.checklist.findMany({
        where:{
            cardsId: where
        }
    }).then((response) => {
        return response
    })
})