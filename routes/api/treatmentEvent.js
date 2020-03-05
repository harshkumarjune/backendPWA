import express from 'express';
import { celebrate } from 'celebrate';
import TreatmentEvent from '../../controllers/treatmentEvent';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/treatment_event', Auth.checkToken ,celebrate(validators.createTreatmentEvent), TreatmentEvent.createTreatmentEvent);

router.get('/treatment_events', Auth.checkToken , TreatmentEvent.getTreatmentEvents);

router.get('/treatment_event/:event_id', Auth.checkToken , TreatmentEvent.getOneTreatmentEvent);

router.put('/treatment_event/:event_id',celebrate(validators.createTreatmentEvent), Auth.checkToken, TreatmentEvent.updateTreatmentEvent)

router.delete('/treatment_event/:event_id', Auth.checkToken, TreatmentEvent.deleteTreatmentEvent)

export default router;