import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, treatment } = models;

class Treatments {

    static async createTreatment(req, res) {
        const { title } = req.body
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const checkTreatment = await treatment.findOne({where: { title }})
            if(checkTreatment) {
                return res.status(400).send({
                    status: 400,
                    message: 'The Treatment with this title already exists'
                })
            }
            
            const addTreatment = await treatment.create({ title })
            return res.status(201).send({
                status: 201,
                message: 'Branch is created successfully',
                treatment: addTreatment
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getTreatments(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreat = await treatment.findAll()
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

    static async getOneTreatment(req, res) {
        const { role } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatment = await treatment.findOne({where: { id: treatment_id }})
            if (!getTreatment ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                treatment: getTreatment
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateTreatment(req, res) {
        const { role, body } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatment = await treatment.findOne({where: { id: treatment_id }})
            if (!getTreatment ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment you want to update does not exist'
                })
            }

            const treatUpdate = await treatment.update(body, {where: { id: treatment_id }, returning: true})

            if (treatUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide the title of the treatment"
                });
              }
            return res.status(200).send({
                status: 200,
                treatment: treatUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteTreatment(req, res) {
        const { role } = req
        const { treatment_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getTreatment = await treatment.findOne({where: { id: treatment_id }})
            if (!getTreatment ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Treatment you want to delete does not exist'
                })
            }

            const deleteTreat = await treatment.destroy({where: { id: treatment_id }})

            return res.status(200).send({
                status: 200,
                deletedTreatment: deleteTreat
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default Treatments;