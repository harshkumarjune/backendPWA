import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";
import _ from 'underscore';

dotenv.config();

const { users, userRoles, branch, cities, services, categories } = models;

class Categories {

    static async createCategory(req, res) {
        const { type, is_active } = req.body
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getCategory = await categories.findOne({where: { type }})
            if(getCategory) {
                return res.status(400).send({
                    status: 400,
                    message: 'The category already exists'
                })
            }
            
            const addCategory = await categories.create({ type, is_active })
            return res.status(201).send({
                status: 201,
                message: 'Category is created successfully',
                category: addCategory
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getCategories(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getCat = await categories.findAll()
            let categoriesData = []
            getCat.map(cat => {
                if(cat.allocated_services === null){
                    categoriesData.push(cat)
                }
                else {
                    let alloc_array = []
                    cat.allocated_services.map(async id => {
                        const serviceData = await services.findOne({where: {id}})
                        alloc_array.push(serviceData)
                    })
                    cat.allocated_services = alloc_array
                    categoriesData.push(cat.allocated_services)
                    }
            })
            return res.status(200).send({
                status: 200,
                categories: getCat
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneCategory(req, res) {
        const { role } = req
        const { cat_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }
            const getCategory = await categories.findOne({where: { id: parseInt(cat_id, 10) }})
            if (!getCategory ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Category you requested does not exist'
                })
            }

            const serviceIds = getCategory.allocated_services == null ? [] : getCategory.allocated_services
            let serviceNames = []
            for(let i=0; i < serviceIds.length; i++) {
                const getNames = await services.findOne({where: { id: serviceIds[i]}})
                serviceNames.push(getNames)
            }
            return res.status(200).send({
                status: 200,
                category: {
                    id: getCategory.id,
                    type: getCategory.type,
                    allocated_services: serviceNames,
                    createdAt: getCategory.createdAt,
                    updatedAt: getCategory.updatedAt
                }
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateCategory(req, res) {
        const { role, body } = req
        const { cat_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getCat = await categories.findOne({where: { id: cat_id }})
            if (!getCat ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Category you want to update does not exist'
                })
            }

            const catUpdate = await categories.update(body, {where: { id: cat_id }, returning: true})

            if (catUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide the type of category"
                });
              }
            return res.status(200).send({
                status: 200,
                category: catUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteCategory(req, res) {
        const { role } = req
        const { cat_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getCat = await categories.findOne({where: { id: cat_id }})
            if (!getCat ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Category you want to delete does not exist'
                })
            }

            const deleteCat = await categories.destroy({where: { id: cat_id }})

            return res.status(200).send({
                status: 200,
                deletedCategory: deleteCat
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async allocatingServices(req, res) {
        const { allocate_services } = req.body;
        const { role } = req;
        const { cat_id } = req.params;

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getCat = await categories.findOne({where: { id: cat_id}})
            if(!getCat) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Category does not exist'
                })
            }
            let service_ids = []
            const serviceList = await services.findAll()
            serviceList.map(ser => service_ids.push(ser.id))
            const check = _.difference(allocate_services, service_ids)

            if (check.length > 0) {
                return res.status(404).send({
                    status: 404,
                    message: `The Service with Id ${check[0]} does not exist`
                })
            }

            const addAllocations = await categories.update({allocated_services: allocate_services},{ where: {id: cat_id}, returning: true})
            return res.status(200).send({
                status: 200,
                category: addAllocations[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something Went Wrong'
            })
        }
    }

    static async removeAllocatingServices(req, res) {
        const { allocate_services } = req.body;
        const { role } = req;
        const { cat_id } = req.params;

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getCat = await categories.findOne({where: { id: cat_id}})
            if(!getCat) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Category does not exist'
                })
            }
            let service_ids = []
            const serviceList = await services.findAll()
            serviceList.map(ser => service_ids.push(ser.id))
            const check = _.difference(allocate_services, service_ids)

            if (check.length > 0) {
                return res.status(404).send({
                    status: 404,
                    message: `The Service with Id ${check[0]} does not exist`
                })
            }

            if(getCat.allocated_services === null){
                return res.status(404).send({
                    status: 404,
                    message: 'This category has no allocated services'
                })
            }
            const checkExist = _.difference(getCat.allocated_services, allocate_services)

            const removeAllocations = await categories.update({allocated_services: checkExist},{ where: {id: cat_id}, returning: true})
            return res.status(200).send({
                status: 200,
                branch: removeAllocations[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something Went Wrong'
            })
        }
    }
}

export default Categories;