import express from 'express';
import { celebrate } from 'celebrate';
import Treatments from '../../controllers/treatment';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/treatment', Auth.checkToken ,celebrate(validators.createTreatment), Treatments.createTreatment);

router.get('/treatments', Auth.checkToken , Treatments.getTreatments);

router.get('/treatment/:treatment_id', Auth.checkToken , Treatments.getOneTreatment);

router.put('/treatment/:treatment_id',celebrate(validators.createTreatment), Auth.checkToken, Treatments.updateTreatment)

router.delete('/treatment/:treatment_id', Auth.checkToken, Treatments.deleteTreatment)

export default router;