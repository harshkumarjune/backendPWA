import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";

dotenv.config();

const { users, userRoles, branch, cities, services, categories, products } = models;

class Services {

    static async createServices(req, res) {
        const { role, body } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getService = await services.findOne({where: { title: body.title }})
            if(getService) {
                return res.status(400).send({
                    status: 400,
                    message: 'The Service already exists'
                })
            }
            
            const addService = await services.create(body)
            return res.status(201).send({
                status: 201,
                message: 'Service is created successfully',
                service: addService
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getServices(req, res) {
        const { role } = req
        const { product_category_id } = req.query

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getSer = await services.findAll()
            if(product_category_id){

                const getServices = await services.findAll({where: {product_category_id}})
                return res.status(200).send({
                    status: 200,
                    services: getServices
                })
            }

            return res.status(200).send({
                status: 200,
                services: getSer
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneService(req, res) {
        const { role } = req
        const { service_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getService = await services.findOne({where: { id: service_id }})
            const getProduct = await products.findOne({where: { id: getService.product_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const getProductCategory = await categories.findOne({where: { id: getService.product_category_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            if (!getService ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Service you requested does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                service: {
                    id: getService.id,
                    title: getService.title,
                    product_category: getProductCategory,
                    product: getProduct,
                    icon: getService.icon,
                    description: getService.description,
                    price: getService.price,
                    discount: getService.discount,
                    is_active: getService.is_active,
                    createdAt: getService.createdAt
                }
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getServiceByProduct(req, res) {
        const { role } = req
        const { product_name } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }
            const getProduct = await products.findOne({ where: { product : product_name}}) 
            
            if(!getProduct){
                return res.status(404).send({
                    status: 404,
                    message: 'The product with this product name does not exist'
                })
            }

            const getService = await services.findOne({where: { product_id: getProduct.id }})
            if (!getService ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Service you with this Product name does not exist'
                })
            }
            return res.status(200).send({
                status: 200,
                service: getService
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async ServiceByProductCategory(req, res) {
        const { role, body } = req
        const { product_category_id } = req.query

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const findByProdCat = await services.findAll({ where: { product_category_id }})
            return res.status(200).send({
                status: 200,
                services : findByProdCat
            })


        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async unlocatedServices(req, res) {
        const { role } = req

        try {
            
            let allocatedServices = []
            const getCategories = await categories.findAll()
            const getServices = await services.findAll()
            for(let i=0; i < getCategories.length; i++){
                if(getCategories[i].allocated_services){
                    const getExist = getCategories[i].allocated_services.filter(cat => !allocatedServices.includes(cat))
                    allocatedServices.push(...getExist)
                }
            }

            const serviceIDs = []
            getServices.map(ser => serviceIDs.push(ser.id))
            const unlocatedSer = serviceIDs.filter(ser => !allocatedServices.includes(ser))
            return res.status(200).send({
                status: 200,
                unlocatedServices: unlocatedSer
            })

        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }


    static async updateService(req, res) {
        const { role, body } = req
        const { service_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getService = await services.findOne({where: { id: service_id }})
            if (!getService ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Service you want to update does not exist'
                })
            }

            const serviceUpdate = await services.update(body, {where: { id: service_id }, returning: true})

            if (serviceUpdate[0] === 0) {
                return res.status(400).send({
                  status: 400,
                  message: "Please Provide valid data to update"
                });
              }
            return res.status(200).send({
                status: 200,
                updatedService: serviceUpdate[1]
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async deleteService(req, res) {
        const { role } = req
        const { service_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
              }

            const getService = await services.findOne({where: { id: service_id }})
            if (!getService ) {
                return res.status(404).send({
                    status: 404,
                    message: 'The Service you want to delete does not exist'
                })
            }

            const deleteSer = await services.destroy({where: { id: service_id }})

            return res.status(200).send({
                status: 200,
                deletedService: deleteSer
            })

        } catch(error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }
}

export default Services;