import express from 'express';
import { celebrate } from 'celebrate';
import Schedules from '../../controllers/schedules'
import validators from '../../helpers/validations';
import Auth from '../../helpers/auth';

const router = express.Router({});

router.post('/schedule', Auth.checkToken , Schedules.createSchedule);

router.get('/schedules', Auth.checkToken, Schedules.getAllSchedules)

router.get('/schedules/owner', Auth.checkToken, Schedules.getScheduleByUser)

router.delete('/schedule/:schedule_id', Auth.checkToken, Schedules.deleteSchedules)

export default router