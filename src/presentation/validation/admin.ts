import { z } from 'zod';

export class AdminValidation {
    public static id = z.object({
        id: z.number(),
    });

    public static login = z.object({
        email: z.string().email().max(255),
        password: z.string().min(5).max(100),
    });

    public static createAdmin = z.object({
        email: z.string().email().max(255),
        password: z.string().min(5).max(100),
        fullname: z.string().min(3).max(60),
        phone_number: z.string().min(10).max(15),
    });

    public static updateAdmin = z.object({
        id: z.number(),
        email: z.string().email().max(255),
        password: z.string().min(5).max(100),
        fullname: z.string().min(3).max(60),
        phone_number: z.string().min(10).max(15),
    });

    public static updateAdminWithoutPassword = z.object({
        id: z.number(),
        email: z.string().email().max(255),
        password: z.string().max(100).default(''),
        fullname: z.string().min(3).max(60),
        phone_number: z.string().min(10).max(15),
    });
}