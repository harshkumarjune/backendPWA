import dotenv from "dotenv";
import models from "../models";

const { schedules } = models;

class Schedules {

    static async createSchedule(req, res) {
        const { schedule, day} = req.body
        const { id } = req

        try {

            const findDay = await schedules.findOne({where: { day }})
            
            if(findDay) {
                const newSchedule = [...findDay.schedules, ...schedule]
                const updateSchedule = await schedules.update({schedules: newSchedule}, { where: {day, user_id:id}, returning: true})
                return res.status(200).send({
                    status: 200,
                    schedule: updateSchedule[1][0]
                })
            }
            const saveSchedule = await schedules.create({schedules: schedule, day, user_id: id})
            return res.status(201).send({
                status: 201,
                schedule: saveSchedule
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getAllSchedules(req, res) {
        const { role } =req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getSchedules = await schedules.findAll()
            return res.status(200).send({
                status: 200,
                schedules: getSchedules
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getScheduleByUser(req, res) {
        const { id } = req

        try {

            const getSchedules = await schedules.findAll({ where: { user_id: id }})   
            if(!getSchedules) {
                return res.status(404).send({
                    status: 404,
                    message: 'The user who is logged in has no schedules'
                })
            }

            return res.status(200).send({
                status: 200,
                schedules: getSchedules
            })

        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteSchedules(req, res) {
        const { id } = req
        const { schedule_id } = req.params
        try {

            const getSchedule = await schedules.findOne({ where: { id: schedule_id }})
            if(!getSchedule) {
                return res.status(404).send({
                    status: 404,
                    message: 'There is no schedule with given id'
                })
            }
            if( getSchedule.user_id !== id ) {
                return res.status(400).send({
                    status: 400,
                    message: 'You can not delete a schedule that is not yours'
                })
            }
            await schedules.destroy({where: {id: schedule_id }})
            return res.status(200).send({
                status: 200,
                message: 'Schedule has been deleted successfully'
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default Schedules