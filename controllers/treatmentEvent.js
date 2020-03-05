import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, treatment_event } = models;

class TreatmentEvents {

    static async createTreatmentEvent(req, res) {
        const { event } = req.body
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }


            const checkTreatmentEvent = await treatment_event.findOne({where: { event }})
            if(checkTreatmentEvent) {
                return res.status(400).send({
                    status: 400,
                    message: 'The Treatment Event already exists'
                })
            }
            
            const addTreatmentEvent = await treatment_event.create({ event })
            return res.status(201).send({
                status: 201,
                message: 'Treatment Event is created successfully',
                event: addTreatmentEvent
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getTreatmentEvents(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatEvent = await treatment_event.findAll()
            return res.status(200).send({
                status: 200,
                treatmentsEventList: getTreatEvent
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneTreatmentEvent(req, res) {
        const { role } = req
        const { event_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentEvent = await treatment_event.findOne({where: { id: event_id }})
            if (!getTreatmentEvent ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Event you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                treatment_event: getTreatmentEvent
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateTreatmentEvent(req, res) {
        const { role, body } = req
        const { event_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentEvent = await treatment_event.findOne({where: { id: event_id }})
            if (!getTreatmentEvent ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Event you want to update does not exist'
                })
            }

            const treatEventUpdate = await treatment_event.update(body, {where: { id: event_id }, returning: true})

            if (treatEventUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide the event"
                });
              }
            return res.status(200).send({
                status: 200,
                treatment_event: treatEventUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteTreatmentEvent(req, res) {
        const { role } = req
        const { event_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentEvent = await treatment_event.findOne({where: { id: event_id }})
            if (!getTreatmentEvent ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Event you want to delete does not exist'
                })
            }

            const deleteTreatEvent = await treatment_event.destroy({where: { id: event_id }})

            return res.status(200).send({
                status: 200,
                deletedTreatmentEvent: deleteTreatEvent
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default TreatmentEvents;