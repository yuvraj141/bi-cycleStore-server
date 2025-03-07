import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { BiCycleRoutes } from "../modules/biCycle/biCycle.route";

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
]
moduleRoutes.forEach((route)=>router.use(route.path,route.route))
export default router