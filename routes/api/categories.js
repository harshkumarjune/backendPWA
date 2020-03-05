import express from 'express';
import { celebrate } from 'celebrate';
import Categories from '../../controllers/categories';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/category', Auth.checkToken , celebrate(validators.createCategory), Categories.createCategory);

router.get('/categories', Auth.checkToken , Categories.getCategories);

router.get('/category/:cat_id', Auth.checkToken , Categories.getOneCategory);

router.put('/category/:cat_id', Auth.checkToken, Categories.updateCategory)

router.delete('/category/:cat_id', Auth.checkToken, Categories.deleteCategory)

router.put('/category/allocate/:cat_id', Auth.checkToken, Categories.allocatingServices)

router.delete('/category/allocate/:cat_id', Auth.checkToken, Categories.removeAllocatingServices)

export default router;