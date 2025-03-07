import { z } from "zod";

 const createBiCycleValidationSchema=z.object({
    body:z.object({
        name:z.string(),
        brand:z.string(),
        model:z.string(),
        category:z.enum(["MTB", "Road", "Hybrid","Electric"]),
        price:z.number(),
        stock:z.number(),
        imageUrl:z.string().optional(),
        description:z.string(),
        isDeleted:z.boolean().optional()
    })
})
//update
 const updateBiCycleValidationSchema=z.object({
    body:z.object({
        name:z.string().optional(),
        brand:z.string().optional(),
        model:z.string().optional(),
        category:z.enum(["MTB", "Road", "Hybrid","Electric"]).optional(),
        price:z.number().optional(),
        stock:z.number().optional(),
        imageUrl:z.string().optional(),
        description:z.string().optional(),
        isDeleted:z.boolean().optional()
    })
})

export const BiCycleValidations={
    createBiCycleValidationSchema,
    updateBiCycleValidationSchema
}