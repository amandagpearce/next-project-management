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
    } catch (err: any) {
        res.status(500).json({ message: `Error retrieving projects: ${err.message}` });
    }
}

export const createProject = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        })
        res.status(201).json(newProject);

    } catch (err: any) {
        res.status(500).json({ message: `Error creating project: ${err.message}` });
    }
}
