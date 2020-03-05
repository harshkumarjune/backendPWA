import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";
import checkDup from '../helpers/utils'

dotenv.config();

const { prof_details } = models

class ProfessionalDetails {

    static async createProfDetails(req, res) {
        const { body, role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            if(body.user_role === 'doctor') {
                const checkExist = await prof_details.findOne({where: {user_id: body.user_id}})
                if (checkExist){
                    return res.status(400).send({
                        status:400,
                        message: 'The professional details for this user already exist'
                    })
                }
                const branchDuplications = checkDup(body.allocate_branches)
                if(branchDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same branches"
                    });
                }
                const specDuplications = checkDup(body.specialization)
                if(specDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same specializations"
                    });
                }
                const docDuplications = checkDup(body.documents)
                if(docDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same documents"
                    });
                }
                const addDetails = await prof_details.create({
                    user_id: body.user_id,
                    phone_verified: body.phone_verified,
                    allocated_branches: body.allocate_branches,
                    organization_name: body.organization_name,
                    specialization: body.specialization,
                    documents: body.documents
                })

                return res.status(201).send({
                    status: 200,
                    details: {
                        user_id: body.user_id,
                        phone_verified: addDetails.phone_verified,
                        allocated_branches: addDetails.allocate_branches,
                        organization_name: addDetails.organization_name,
                        specialization: addDetails.specialization,
                        documents: addDetails.documents
                    }
                })
            }

            if(body.user_role === 'admin') {
                const checkExist = await prof_details.findOne({where: {user_id: body.user_id}})
                if (checkExist){
                    return res.status(400).send({
                        status:400,
                        message: 'The professional details for this user already exist'
                    })
                }
                const branchDuplications = checkDup(body.allocate_branches)
                if(branchDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same branches"
                    });
                }

                const docDuplications = checkDup(body.documents)
                if(docDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same documents"
                    });
                }
                const addDetails = await prof_details.create({
                    user_id: body.user_id,
                    phone_verified: body.phone_verified,
                    allocated_branches: body.allocate_branches,
                    documents: body.documents
                })

                return res.status(201).send({
                    status: 200,
                    details: {
                        user_id: addDetails.user_id,
                        phone_verified: addDetails.phone_verified,
                        allocated_branches: addDetails.allocated_branches,
                        documents: addDetails.documents
                    }
                })
            }

            if(body.user_role === 'vendor') {
                const checkExist = await prof_details.findOne({where: {user_id: body.user_id}})
                if (checkExist){
                    return res.status(400).send({
                        status:400,
                        message: 'The professional details for this user already exist'
                    })
                }
                const branchDuplications = checkDup(body.allocate_branches)
                if(branchDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same branches"
                    });
                }
                const serviceDup = checkDup(body.services)
                if(serviceDup) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same Services"
                    });
                }
                const docDuplications = checkDup(body.documents)
                if(docDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same documents"
                    });
                }
                const addDetails = await prof_details.create({
                    user_id: body.user_id,
                    phone_verified: body.phone_verified,
                    allocated_branches: body.allocate_branches,
                    organization_name: body.organization_name,
                    services: body.services,
                    documents: body.documents
                })

                return res.status(201).send({
                    status: 200,
                    details: {
                        user_id: addDetails.user_id,
                        phone_verified: addDetails.phone_verified,
                        allocated_branches: addDetails.allocate_branches,
                        organization_name: addDetails.organization_name,
                        services: addDetails.services,
                        documents: addDetails.documents
                    }
                })
            }

            if(body.user_role === 'nurse') {
                const checkExist = await prof_details.findOne({where: {user_id: body.user_id}})
                if (checkExist){
                    return res.status(400).send({
                        status:400,
                        message: 'The professional details for this user already exist'
                    })
                }
                const branchDuplications = checkDup(body.allocate_branches)
                if(branchDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same branches"
                    });
                }
                const docDuplications = checkDup(body.documents)
                if(docDuplications) {
                    return res.status(400).send({
                    status: 400,
                    error: "You have provided same documents"
                    });
                }

                if(body.status === 'under training'){
                    const addDetails = await prof_details.create({
                        user_id: body.user_id,
                        reg_id: body.reg_id,
                        phone_verified: body.phone_verified,
                        allocated_branches: body.allocate_branches,
                        status: body.status,
                        join_date: body.join_date,
                        documents: body.documents
                    })
                    return res.status(201).send({
                        status: 200,
                        details: {
                            user_id: addDetails.user_id,
                            reg_id: addDetails.reg_id,
                            phone_verified: addDetails.phone_verified,
                            allocated_branches: addDetails.allocate_branches,
                            status: addDetails.status,
                            join_date: addDetails.join_date,
                            documents: addDetails.documents
                        }
                    })
                }

                if(body.status === 'active' && body.alloc_product === 2){
                    const addDetails = await prof_details.create({
                        user_id: body.user_id,
                        reg_id: body.reg_id,
                        phone_verified: body.phone_verified,
                        allocated_branches: body.allocate_branches,
                        allocated_product: body.alloc_product,
                        status: body.status,
                        join_date: body.join_date,
                        documents: body.documents
                    })
                    return res.status(201).send({
                        status: 200,
                        details: {
                            user_id: addDetails.user_id,
                            reg_id: addDetails.reg_id,
                            phone_verified: addDetails.phone_verified,
                            allocated_branches: addDetails.allocated_branches,
                            allocated_product: addDetails.allocated_product,
                            status: addDetails.status,
                            join_date: addDetails.join_date,
                            documents: addDetails.documents
                        }
                    })
                }

                if(body.status === 'active' && body.alloc_product === 1){
                    const addDetails = await prof_details.create({
                        user_id: body.user_id,
                        reg_id: body.reg_id,
                        phone_verified: body.phone_verified,
                        allocated_branches: body.allocate_branches,
                        allocated_product: body.alloc_product,
                        allocate_appartment: body.all_apartment,
                        is_loc_ap: body.is_loc_ap,
                        status: body.status,
                        join_date: body.join_date,
                        documents: body.documents
                    })
                    return res.status(201).send({
                        status: 200,
                        details: {
                            user_id: addDetails.user_id,
                            reg_id: addDetails.reg_id,
                            phone_verified: addDetails.phone_verified,
                            allocated_branches: addDetails.allocated_branches,
                            allocated_product: addDetails.allocated_product,
                            allocate_appartment: addDetails.allocate_appartment,
                            is_loc_ap: addDetails.is_loc_ap,
                            status: addDetails.status,
                            join_date: addDetails.join_date,
                            documents: addDetails.documents
                        }
                    })
                }

                if(body.status === 'active' && body.alloc_product === 3){
                    const addDetails = await prof_details.create({
                        user_id: body.user_id,
                        reg_id: body.reg_id,
                        phone_verified: body.phone_verified,
                        allocated_branches: body.allocate_branches,
                        allocated_product: body.alloc_product,
                        allocated_creche: body.alloc_creche,
                        charge_per_month: body.charge_per_month, 
                        status: body.status,
                        join_date: body.join_date,
                        start_date: body.start_date,
                        end_date: body.end_date,
                        documents: body.documents
                    })
                    return res.status(201).send({
                        status: 200,
                        details: {
                            user_id: addDetails.user_id,
                            reg_id: addDetails.reg_id,
                            phone_verified: addDetails.phone_verified,
                            allocated_branches: addDetails.allocated_branches,
                            allocated_product: addDetails.allocated_product,
                            allocated_creche: addDetails.allocated_creche,
                            charge_per_month: addDetails.charge_per_month, 
                            status: addDetails.status,
                            join_date: addDetails.join_date,
                            start_date: addDetails.start_date,
                            end_date: addDetails.end_date,
                            documents: addDetails.documents
                        }
                    })
                }

                if(body.status === 'active' && body.alloc_product === 4){
                    const addDetails = await prof_details.create({
                        user_id: body.user_id,
                        reg_id: body.reg_id,
                        phone_verified: body.phone_verified,
                        allocated_branches: body.allocate_branches,
                        allocated_product: body.alloc_product,
                        allocate_customer: body.allocate_customer,
                        charge_per_month: body.charge_per_month, 
                        status: body.status,
                        join_date: body.join_date,
                        start_date: body.start_date,
                        end_date: body.end_date,
                        documents: body.documents
                    })
                    return res.status(201).send({
                        status: 200,
                        details: {
                            user_id: addDetails.user_id,
                            reg_id: addDetails.reg_id,
                            phone_verified: addDetails.phone_verified,
                            allocated_branches: addDetails.allocated_branches,
                            allocated_product: addDetails.allocated_product,
                            allocate_customer: addDetails.allocate_customer,
                            charge_per_month: addDetails.charge_per_month, 
                            status: addDetails.status,
                            join_date: addDetails.join_date,
                            start_date: addDetails.start_date,
                            end_date: addDetails.end_date,
                            documents: addDetails.documents
                        }
                    })
                }

            }


        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something Went Wrong'
            })
        }
    }

    static async updateProfDetails(req, res) {
        const { role, id, body } = req
        const { user_id } = req.params
        try {
            
            if(!role.includes(1) && id !== user_id ) {
                return res.status(500).send({
                    status: 400,
                    message: 'To update the details you have to be the owner or super admin'
                })
            }

            const getDetails = await prof_details.findOne({where: { id: parseInt(user_id, 10) }})
            if(!getDetails) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Professional Details you want to updated does not exist'
                })
            }

            const updateDetails = await prof_details.update(body, {where: { user_id }})
            if(updateDetails[0] === 0) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please provide valid data to update'
                })
            }
            return res.status(200).send({
                status: 200,
                message: 'Data updated successfully'
            })
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default ProfessionalDetails;


