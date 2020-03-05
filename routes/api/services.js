import express from 'express';
import { celebrate } from 'celebrate';
import Services from '../../controllers/services';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/service', Auth.checkToken , celebrate(validators.createService), Services.createServices);

router.get('/services', Auth.checkToken , Services.getServices);

router.get('/service/:service_id', Auth.checkToken , Services.getOneService);

router.get('/services/:product_name', Auth.checkToken , Services.getServiceByProduct);

router.put('/service/:service_id', Auth.checkToken, Services.updateService)

router.delete('/service/:service_id', Auth.checkToken, Services.deleteService)

router.get('/product_category', Auth.checkToken, Services.ServiceByProductCategory)

router.get('/unlocated', Auth.checkToken, Services.unlocatedServices)

export default router;