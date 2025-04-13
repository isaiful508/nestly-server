import { z } from "zod";

export const createTenantRequestValidation = z.object({
    body: z.object({
        rentalHouseId: z.string({required_error: "Rental house id is required"}),
        message: z.string({required_error: "Message is required"}),
    })
})  