import express from 'express';
import { celebrate } from 'celebrate';
import Orders from '../../controllers/orders';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({}); 

router.post('/order', Auth.checkToken, Orders.createOrder)

router.get('/orders', Auth.checkToken, Orders.getAllOrders)

router.get('/order/:order_id', Auth.checkToken, Orders.getOneOrder)

router.put('/order/:order_id', Auth.checkToken, Orders.updateOrder)

export default router