import express from 'express';
import { celebrate } from 'celebrate';
import Users from '../../controllers/users'
import validators from '../../helpers/validations'
import Auth from '../../helpers/auth';

const router = express.Router({});
// create user
router.post('/auth/register', celebrate(validators.createUser),Users.createUser)

// Login the user
router.post('/auth/login', celebrate(validators.loginUser), Users.login)

// Get All the users
router.get('/auth/users', Auth.checkToken, Users.getAllUsers)

// Get One User
router.get('/auth/user/:id', Auth.checkToken, Users.getOneUser)

// Update User
router.put('/auth/user/:id', Auth.checkToken, Users.updateUser)

// Delete User
router.delete('/auth/user/:id', Auth.checkToken, Users.deleteUser)

// Get users by role
router.get('/auth/users/role/:role_id', Auth.checkToken, Users.getUsersByRole)

// Get Nurses
router.get('/users/nurse', Auth.checkToken, Users.getAvailableNurses)

export default router;