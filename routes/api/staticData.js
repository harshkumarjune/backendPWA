import express from 'express';
import { celebrate } from 'celebrate';
import StaticData from '../../controllers/staticData';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/add-language', Auth.checkToken , celebrate(validators.createLanguage),StaticData.addLanguage);
router.get('/languages', Auth.checkToken , StaticData.getLanguages);
router.get('/roles',Auth.checkToken , StaticData.getRoles);
router.post('/create-config', Auth.checkToken, celebrate(validators.createConfig),StaticData.createdConfigValue);
router.get('/get-config', celebrate(validators.getConfig),StaticData.getConfigValue)
router.put('/update-config/:fetch_key', Auth.checkToken, StaticData.updateConfigValue)
router.get('/cities', StaticData.getCities)
router.get('/states', StaticData.getStates)
router.get('/state/cities/:state_id', StaticData.getCitiesInState)
router.get('/check-phone-email', Auth.checkToken, StaticData.checkEmailAndPassword)
router.get('/city/:id', StaticData.getCity)
router.get('/state/:id',  StaticData.getState)


export default router;