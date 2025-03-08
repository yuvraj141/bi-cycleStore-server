import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post('/login',validateRequest(AuthValidations.loginValidationSchema),AuthController.loginUser )

router.post(
    '/refresh-token',
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthController.refreshToken,
  );
export const AuthRoutes=router