import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, userRoles, branch, cities, product_allocation_block, products, states } = models;

class ProductAllocation {

    static async createProductAllocation(req, res) {
        const { product_id, city_id, name, contact_number,address, branch_id } = req.body
        const { role, body } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }
            if(contact_number.toString().length < 10 ){
                return res.status(400).send({
                  status: 400,
                  error: "The Phone number should be more than 10 digits"
                });
              }
            const checkProductAllocation = await product_allocation_block.findOne({where: { name }})
            if(checkProductAllocation) {
                return res.status(400).send({
                    status: 400,
                    message: 'The Allocation with this name already exists'
                })
            }

            const checkCity = await cities.findOne({ where: {id: city_id}})
            if( !checkCity ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The city you mentioned does not exist'
                })
            }

            const checkBranch = await products.findOne({ where: {id: product_id}})
            if( !checkBranch ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Branch you mentioned does not exist'
                })
            }
            
            const addProductAllocation = await product_allocation_block.create(body)
            return res.status(201).send({
                status: 201,
                message: 'The Product Allocation is created successfully',
                Allocation: addProductAllocation
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async allocateNurseToApartments(req, res) {
        const { role } = req
        const { alloc_id, allocated_nurses, primary_nurse } = req.body 
        try {

            const checkAllocations = await product_allocation_block.findOne({where: { id: alloc_id }})
            if(!checkAllocations) {
                return res.status(404).send({
                    status: 404,
                    message: 'There is no apartment with the id provided'
                })
            }
            const addNurses = await product_allocation_block.update({allocated_nurses, primary_nurse}, {where: {id: alloc_id}, returning: true})
            return res.status(200).send({
                status: 200,
                updatedAllocation: addNurses[1][0]
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getProductAllocations(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getAllocations = await product_allocation_block.findAll()
            let locations = []
            for(let i=0; i < getAllocations.length; i++) {
                const product = await products.findOne({where: { id: getAllocations[i].product_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                const stateData = await states.findOne({ where: { id: getAllocations[i].state_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                const cityData = await cities.findOne({ where: { id: getAllocations[i].city_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                const branchData = await branch.findOne({ where: { id: getAllocations[i].branch_id }, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                const primaryNurseData = await users.findOne({ where: { id: getAllocations[i].primary_nurse }, attributes: ['id', 'first_name', 'last_name', 'email', ]})
                let data = {
                    id: getAllocations[i].id,
                    name: getAllocations[i].name,
                    product: product,
                    state: stateData,
                    city: cityData,
                    address: getAllocations[i].address,
                    locality: getAllocations[i].locality,
                    landmark: getAllocations[i].landmark,
                    contact_number: getAllocations[i].contact_number,
                    contact_person: getAllocations[i].contact_person,
                    status: getAllocations[i].status,
                    branch: branchData,
                    pincode: getAllocations[i].pincode,
                    is_active: getAllocations[i].is_active,
                    primary_nurse: primaryNurseData,
                }
                let nurseData = []
                const allLength = getAllocations[i].allocated_nurses.length
                for(let i = 0; i < allLength; i++) {
                    const getNurseData = await users.findOne({where: { id: getAllocations[i].allocated_nurses[i]},attributes: ['id', 'first_name', 'last_name', 'email', ]})
                    nurseData.push(getNurseData)
                }
                data['allocated_nurses'] = nurseData
                locations.push(data)
            }
            return res.status(200).send({
                status: 200,
                Allocations: locations
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneProductAllocation(req, res) {
        const { role, body } = req
        const { allocation_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getAllocations = await product_allocation_block.findOne({where: { id: allocation_id }})
            const product = await products.findOne({where: { id: getAllocations.product_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const stateData = await states.findOne({ where: { id: getAllocations.state_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const cityData = await cities.findOne({ where: { id: getAllocations.city_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const branchData = await branch.findOne({ where: { id: getAllocations.branch_id }})
            const primaryNurseData = await users.findOne({ where: { id: getAllocations.primary_nurse }, attributes: ['id', 'first_name', 'last_name', 'email', ]})
            let data = {
                id: getAllocations.id,
                name: getAllocations.name,
                product: product,
                state: stateData,
                city: cityData,
                address: getAllocations.address,
                locality: getAllocations.locality,
                landmark: getAllocations.landmark,
                contact_number: getAllocations.contact_number,
                contact_person: getAllocations.contact_person,
                status: getAllocations.status,
                branch: branchData,
                pincode: getAllocations.pincode,
                is_active: getAllocations.is_active,
                primary_nurse: primaryNurseData,
            }
            if (!getAllocations ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Product Allocation you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                Allocation: data
            })

        } catch(error) {
            console.log('======',error)
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateProductAllocation(req, res) {
        const { role, body } = req
        const { allocation_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getAllocation = await product_allocation_block.findOne({where: { id: allocation_id }})
            if (!getAllocation ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Product Allocation you want to update does not exist'
                })
            }

            const allocationUpdate = await product_allocation_block.update(body, {where: { id: allocation_id }, returning: true})

            if (allocationUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide the valid data to update"
                });
              }
            return res.status(200).send({
                status: 200,
                updatedAllocation: allocationUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteProductAllocation(req, res) {
        const { role } = req
        const { allocation_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getAllocation = await product_allocation_block.findOne({where: { id: allocation_id }})
            if (!getAllocation ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Product Allocation you want to delete does not exist'
                })
            }

            const deleteAllocation = await product_allocation_block.destroy({where: { id: allocation_id }})

            return res.status(200).send({
                status: 200,
                deletedAllocation: deleteAllocation
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default ProductAllocation;