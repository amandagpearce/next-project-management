import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// used for retrieving data from db
const prisma = new PrismaClient();

export const getProjects = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // getting the entire list of projects with prisma orm
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving projects.' });
    }
}
