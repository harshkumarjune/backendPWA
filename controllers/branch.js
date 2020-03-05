import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, userRoles, branch, cities, states, prof_details } = models;

class Branch {

    static async createBranch(req, res) {
        const { city_id, name, is_active } = req.body
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const checkBranch = await branch.findOne({where: { name }})
            if(checkBranch) {
                return res.status(400).send({
                    status: 400,
                    message: 'The branch with this branch name already exists'
                })
            }

            const checkCity = await cities.findOne({ where: {id: city_id}})
            if( !checkCity ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The city you mentioned does not exist'
                })
            }
            
            const addBranch = await branch.create({ city_id, name, is_active })
            return res.status(201).send({
                status: 201,
                message: 'Branch is created successfully',
                branch: addBranch
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getBranches(req, res) {
        const { role } = req

        try {

            let getBranch = []
            if(role.includes(1)) {
                const requestBranches = await branch.findAll()
                getBranch = requestBranches
            }
            if(role.includes(2) && !role.includes(1)){
                
                let newData = []
                const getLocBranches = await prof_details.findOne({where: {user_id: req.id}})
                for(let i=0; i< getLocBranches.allocated_branches.length; i++) {
                    const getBranchData = await branch.findOne({where: { id: getLocBranches.allocated_branches[i]}})
                    newData.push(getBranchData)
                }
                getBranch = newData
            }
            let updatedInfos = []
            for(let i=0; i < getBranch.length; i++) {
                let newBranchInfo = {}
                const cityId = getBranch[i].city_id
                newBranchInfo['id'] = getBranch[i].id
                newBranchInfo['name'] = getBranch[i].name
                newBranchInfo['is_active'] = getBranch[i].is_active
                const getCityName = await cities.findOne({ where: {id: cityId }})
                newBranchInfo['city'] = {
                    id : getCityName.id,
                    name : getCityName.city
                }
                const getStateName = await states.findOne({ where: { id: getCityName.state_id}})
                newBranchInfo['state'] = {
                    id: getStateName.id,
                    name : getStateName.state
                }
                updatedInfos.push(newBranchInfo)
            }

            return res.status(200).send({
                status: 200,
                branches: updatedInfos
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneBranch(req, res) {
        const { role, body } = req
        const { branch_id } = req.params

        try {

            const getAllBranches = await prof_details.findOne({where: {user_id: req.id}})
            if(role.includes(2) && !role.includes(1) && !getAllBranches.allocated_branches.includes(parseInt(branch_id, 10))){
                return res.status(401).send({
                    status: 401,
                    error: "This Branch is not allocated to this User"
                  });
            }

            const getBranch = await branch.findOne({where: { id: branch_id }})
            const getState = await cities.findOne({ where: {id: getBranch.city_id}})
            const state_name = await states.findOne({where: {id: getState.state_id}})
            if (!getBranch ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The branch you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                branches: {
                    getBranch,
                    state: {
                        id: state_name.id,
                        name: state_name.state
                    }
                }
            })

        } catch(error) {
            console.log('error', error)
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getBranchByCity(req, res) {
        const { role } = req
        const { city_id} = req.body

        try {
            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getBranches = await branch.findAll({ where: { city_id }})
            if(!getBranches) {
                return res.status(404).send({
                    status: 404,
                    message: 'The city you provided does not have branches'
                })
            }
            const getState = await cities.findOne({ where: {id: city_id}})
            const state_name = await states.findOne({where: {id: getState.state_id}})
            return res.status(200).send({
                status: 200,
                branches: {
                    getBranches,
                    state: state_name.state
                }
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateBranch(req, res) {
        const { role, body } = req
        const { branch_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getBranch = await branch.findOne({where: { id: branch_id }})
            if (!getBranch ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The branch you want to update does not exist'
                })
            }

            const branchUpdate = await branch.update(body, {where: { id: branch_id }, returning: true})

            if (branchUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide either name, city_id or is_active"
                });
              }
            return res.status(200).send({
                status: 200,
                branch: branchUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteBranch(req, res) {
        const { role } = req
        const { branch_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getBranch = await branch.findOne({where: { id: branch_id }})
            if (!getBranch ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The branch you want to delete does not exist'
                })
            }

            const deleteBr = await branch.destroy({where: { id: branch_id }})

            return res.status(200).send({
                status: 200,
                deletedBrach: deleteBr
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default Branch;