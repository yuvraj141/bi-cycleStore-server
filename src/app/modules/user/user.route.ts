import express, { NextFunction, Request, Response } from "express"
import { UserControllers } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { changeStatusValidationSchema, createUserValidationSchema } from "./user.validation"

const router=express.Router()
router.post('/register',
    validateRequest(createUserValidationSchema),
    UserControllers.registerUser)

router.post('/change-status/:id',
    validateRequest(  changeStatusValidationSchema
    ),
    UserControllers.changeStatus)

    export const userRoutes=router