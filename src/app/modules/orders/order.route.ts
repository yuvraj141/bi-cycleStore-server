import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
    '/create-order',auth(USER_ROLE.customer),
    validateRequest(
      OrderValidations.createOrderValidationSchema
    ),OrderController.createOrder
  );
router.get(
    '/my-orders',auth(USER_ROLE.customer),
    OrderController.getMyOrders
  );
router.get(
    '/',auth(USER_ROLE.admin),
    OrderController.getAllOrders
  );
  export const OrderRoutes=router