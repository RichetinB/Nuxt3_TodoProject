import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.title != null){
        const checklist = await prisma.checklist.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
            }
        })
        return checklist
    } else if (body.isFinished != null) {
        const checklist = await prisma.checklist.update({
            where: {
                id: body.id
            },
            data: {
                isFinished: body.isFinished,
            }
        })
        return checklist
    } 
})
