import express from 'express';
import { celebrate } from 'celebrate';
import Branch from '../../controllers/branch';
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/branch', Auth.checkToken , celebrate(validators.createBranch),Branch.createBranch);
router.get('/branches', Auth.checkToken , Branch.getBranches);
router.get('/branch/:branch_id', Auth.checkToken , Branch.getOneBranch);
router.put('/branch/:branch_id', Auth.checkToken , Branch.updateBranch);
router.delete('/branch/:branch_id', Auth.checkToken , Branch.deleteBranch);
router.get('/city/branches', Auth.checkToken, Branch.getBranchByCity);
export default router;