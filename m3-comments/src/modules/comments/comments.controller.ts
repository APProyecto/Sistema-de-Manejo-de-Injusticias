import {Request, Response} from "express";
import { prisma } from "../../config/prisma";

export const getComments = (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: "Get comments endpoint",
    });
};

export const createComment = (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: "Create comment endpoint",
    });
};

