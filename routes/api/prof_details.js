import express from 'express';
import { celebrate } from 'celebrate';
import ProfessionalDetails from '../../controllers/prof_details';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/prof-details', Auth.checkToken , ProfessionalDetails.createProfDetails);

router.put('/prof-details/:user_id', Auth.checkToken, ProfessionalDetails.updateProfDetails)
export default router;