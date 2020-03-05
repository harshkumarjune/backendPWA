import express from 'express';
import { celebrate } from 'celebrate';
import ProductAllocation from '../../controllers/product_allocations';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/productAllocation', Auth.checkToken ,celebrate(validators.createProductAllocation), ProductAllocation.createProductAllocation);

router.get('/productAllocations', Auth.checkToken , ProductAllocation.getProductAllocations);

router.get('/productAllocation/:allocation_id', Auth.checkToken , ProductAllocation.getOneProductAllocation);

router.put('/productAllocation/:allocation_id', Auth.checkToken, ProductAllocation.updateProductAllocation)

router.delete('/productAllocation/:allocation_id', Auth.checkToken, ProductAllocation.deleteProductAllocation)

router.post('/allocate-nurse', Auth.checkToken, ProductAllocation.allocateNurseToApartments)

export default router;