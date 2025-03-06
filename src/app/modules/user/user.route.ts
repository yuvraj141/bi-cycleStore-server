import express, { NextFunction, Request, Response } from "express"
import { UserControllers } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createUserValidationSchema } from "./user.validation"

const router=express.Router()
router.post('/register',
    validateRequest(createUserValidationSchema),
    UserControllers.registerUser)

    export const userRoutes=router