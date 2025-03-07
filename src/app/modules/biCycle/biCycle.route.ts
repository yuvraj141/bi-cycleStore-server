import express  from "express"
import validateRequest from "../../middlewares/validateRequest"
import { BiCycleValidations } from "./biCycle.validation"
import { BiCycleControllers } from "./biCycle.controller"
const router=express.Router()

router.post('/create-biCycle',
    validateRequest(BiCycleValidations.createBiCycleValidationSchema),
    BiCycleControllers.createBiCycles
)
router.get('/',
    BiCycleControllers.getAllBiCycles
)
router.get('/:id',
    BiCycleControllers.getSingleBiCycle
)
router.patch('/:id',validateRequest(BiCycleValidations.updateBiCycleValidationSchema),
    BiCycleControllers.updateBiCycle
)
router.delete('/:id',
    BiCycleControllers.deleteBiCycle
)
export const BiCycleRoutes=router