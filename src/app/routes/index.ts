import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { BiCycleRoutes } from "../modules/biCycle/biCycle.route";
import { OrderRoutes } from "../modules/orders/order.route";
import { AuthRoutes } from "../auth/auth.route";

const router=Router()

const moduleRoutes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/biCycles',
        route:BiCycleRoutes
    },
    {
        path:'/order',
        route:OrderRoutes
        
    },
    {
        path:'/auth',
        route:AuthRoutes
        
    },
]
moduleRoutes.forEach((route)=>router.use(route.path,route.route))
export default router