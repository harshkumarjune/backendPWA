import express from 'express';
import userRouter from './users';
import staticDataRouter from './staticData'
import branch from './branch'
import categories from './categories'
import services from './services'
import treatment from './treatments'
import treatment_event from './treatmentEvent'
import treatmentPlan from './treatmentPlan'
import productAllocations from './productAllocation'
import professionalDetails from './prof_details'
import order from './order'
import schedule from './schedules'

const router = express.Router();

router.use('/', userRouter);
router.use('/', staticDataRouter);
router.use('/', branch)
router.use('/', categories)
router.use('/', services)
router.use('/', treatment)
router.use('/', treatment_event)
router.use('/', treatmentPlan)
router.use('/', productAllocations)
router.use('/', professionalDetails)
router.use('/', order)
router.use('/', schedule)

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
