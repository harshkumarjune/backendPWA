import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, treatment, treatment_plan } = models;

class TreatmentPlans {

    static async createTreatmentPlan(req, res) {
        const { title, treatment_id, events, created } = req.body
        const { role, id } = req

        try {

            const checkTreatmentPlan = await treatment_plan.findOne({where: { title, createdBy: id }})
            if(checkTreatmentPlan) {
                return res.status(400).send({
                    status: 400,
                    message: 'The Treatment Plan with this title already exists'
                })
            }
            
            const addTreatmentPlan = await treatment_plan.create({ title, treatment_id, events, createdBy: id})
            return res.status(201).send({
                status: 201,
                message: 'The Treatment Plan is created successfully',
                treatment_plan: addTreatmentPlan
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getTreatmentPlans(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreat = await treatment_plan.findAll()
            return res.status(200).send({
                status: 200,
                treatmentsList: getTreat
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneTreatmentPlan(req, res) {
        const { role } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentPlan = await treatment_plan.findOne({where: { id: treatment_id }})
            if (!getTreatmentPlan ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Plan you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                treatmentPlan: getTreatmentPlan
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateTreatmentPlan(req, res) {
        const { role, body } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentPlan = await treatment_plan.findOne({where: { id: treatment_id }})
            if (!getTreatmentPlan ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Plan you want to update does not exist'
                })
            }

            const treatUpdate = await treatment_plan.update(body, {where: { id: treatment_id }, returning: true})

            if (treatUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide all required data"
                });
              }
            return res.status(200).send({
                status: 200,
                treatmentPlan: treatUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteTreatmentPlan(req, res) {
        const { role } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatmentPlan = await treatment_plan.findOne({where: { id: treatment_id }})
            if (!getTreatmentPlan ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment Plan you want to delete does not exist'
                })
            }

            const deleteTreat = await treatment_plan.destroy({where: { id: treatment_id }})

            return res.status(200).send({
                status: 200,
                deletedTreatmentPlan: deleteTreat
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default TreatmentPlans;