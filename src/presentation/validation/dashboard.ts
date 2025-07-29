import { z } from 'zod';

export class DashboardValidation {
    public static date = z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use yyyy-mm-dd"),
    });

    public static financialReportDate = z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format. Use yyyy-mm-dd"),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date format. Use yyyy-mm-dd"),
    });
}
