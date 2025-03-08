import { z } from "zod";

const createOrderValidationSchema=z.object({
    body:z.object({
        biCycle:z.string()
    })
})
export const OrderValidations={
    createOrderValidationSchema
}