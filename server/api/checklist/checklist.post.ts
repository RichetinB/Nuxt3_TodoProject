import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let checklist = null

        checklist = await prisma.checklist.create({
            data: {
                title: "",
                cardsId: body.cardsId
            },
        })
        
    return {
        checklist
    }
})