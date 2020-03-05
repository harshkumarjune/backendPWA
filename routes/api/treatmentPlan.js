import express from 'express';
import { celebrate } from 'celebrate';
import TreatmentPlans from '../../controllers/treatment_plans';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/treatmentPlan', Auth.checkToken , celebrate(validators.createTreatmentPlan), TreatmentPlans.createTreatmentPlan);

router.get('/treatmentPlans', Auth.checkToken , TreatmentPlans.getTreatmentPlans);

router.get('/treatmentPlan/:treatment_id', Auth.checkToken , TreatmentPlans.getOneTreatmentPlan);

router.put('/treatmentPlan/:treatment_id', Auth.checkToken, TreatmentPlans.updateTreatmentPlan)

router.delete('/treatmentPlan/:treatment_id', Auth.checkToken, TreatmentPlans.deleteTreatmentPlan)

export default router;