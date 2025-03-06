import { z } from "zod"

export const createUserValidationSchema=z.object({
    body:z.object({
        name:z.string().min(3).max(15).refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',  }),
        email: z.string().email({ message: 'Invalid email format' }),
        password:z.string().max(12),
    //   role:z.enum(['admin','customer']),
    //     status:'active'|'inActive'
    })
})

export const userValidations={
  createUserValidationSchema
}