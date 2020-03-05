import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";
import _ from 'underscore';

const { users, userRoles, branch, cities, services, categories, orders } = models;

class Orders {

    static async createOrder(req, res) {
        const {body, role} = req
        
        try {

            const addOrder = await orders.create(body)
            return res.status(201).send({
                status: 201,
                order: addOrder
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getAllOrders(req, res) {
        const { role } = req

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getOrders = await orders.findAll()
            let orderData = []
            for(let i=0; i < getOrders.length; i++){
                let data = {
                    id: getOrders[i].id,
                    scheduled_time: getOrders[i].scheduled_time,
                    date: getOrders[i].date,
                    service_amount: getOrders[i].service_amount,
                    is_paid: getOrders[i].is_paid,
                    payment_mode: getOrders[i].payment_mode,
                    transaction_id: getOrders[i].transaction_id,
                    comment: getOrders[i].comment,
                    createdAt: getOrders[i].createdAt,
                }

                const category = await categories.findOne({where: {id: getOrders[i].category}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                data['category'] = category
                const service = await services.findOne({ where: {id: getOrders[i].service}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                data['service'] = service
                const user = await users.findOne({where: { id: getOrders[0].user_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
                data['user_id'] = user
                const allocated_nurses = await users.findOne({ where: { id: getOrders[i].allocated_nurses },attributes: { exclude: ['createdAt', 'updatedAt'] }})
                data['allocated_nurses'] = allocated_nurses

                orderData.push(data)
            }
            return res.status(200).send({
                status: 200,
                orders: orderData
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async getOneOrder(req, res) {
        const { role } = req
        const { order_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getOrder = await orders.findOne({where: {id: order_id}})
            if(!getOrder) {
                return res.status(404).send({
                    status: 404,
                    message: 'The order with the id provided is not found'
                })
            }

            const categoryData = await categories.findOne({where: {id: getOrder.category}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const serviceData = await services.findOne({ where: {id: getOrder.service}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
            const allocated_nurses_data = await users.findOne({ where: { id: getOrder.allocated_nurses },attributes: { exclude: ['createdAt', 'updatedAt'] }})

            return res.status(200).send({
                status: 200,
                order: {
                    id: getOrder.id,
                    scheduled_time: getOrder.scheduled_time,
                    date: getOrder.date,
                    service_amount: getOrder.service_amount,
                    is_paid: getOrder.is_paid,
                    payment_mode: getOrder.payment_mode,
                    transaction_id: getOrder.transaction_id,
                    comment: getOrder.comment,
                    category: categoryData,
                    service: serviceData,
                    allocated_nurses: allocated_nurses_data,
                    createdAt: getOrder.createdAt,
                }
            })
            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

    static async updateOrder(req, res) {
        const { role, body } = req
        const { order_id } = req.params

        try {

            if (!role.includes(1)) {
                return res.status(401).send({
                  status: 401,
                  error: "This Action requires Super Admin Permissions"
                });
            }

            const getOrder = await orders.findOne({ where: {id: order_id}})
            if(!getOrder) {
                return res.status(404).send({
                    status: 404,
                    message: 'The order with the id provided is not found'
                })
            }

            const updOrder = await orders.update(body, { where: { id: order_id }, returning: true })

            return res.status(200).send({
                status: 200,
                update_order: updOrder[1][0]
            })

            
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: 'Something went wrong'
            })
        }
    }

}
export default Orders