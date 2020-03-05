import dotenv from "dotenv";
import models from "../models";
import Auth from "../helpers/auth";
import checkDup from '../helpers/utils';
import _ from 'underscore';

dotenv.config();

const { users, userRoles, prof_details, cities, states, branch } = models;

class Users {
  // User signup
  static async createUser(req, res) {

    const { body } = req
    try {

      const checkUser = await users.findOne({ where: { mobile_number: body.mobile_number } });
      if (checkUser) {
        return res.status(400).send({
          status: 400,
          error: "The user with this Phone number is already registered"
        });
      }

      if(body.mobile_number.toString().length < 10 ){
        return res.status(400).send({
          status: 400,
          error: "The Phone number should be more than 10 digits"
        });
      }

      const checkEmail = await users.findOne({ where: { email: body.email } });
      if (checkEmail) {
        return res.status(400).send({
          status: 400,
          error: "The user with this Email is already registered"
        });
      }

      const roleDuplications = checkDup(body.user_role)
      if(roleDuplications) {
        return res.status(400).send({
          status: 400,
          error: "You have provided same roles"
        });
      }
      const passwordHarsh = Auth.passwordHash(body.password);
      body.password = passwordHarsh

      const userCreation = await users.create(body)

      return res.status(201).send({
        status: 201,
        message: "User Created Successfully",
        user: {
          id: userCreation.id,
          first_name: userCreation.first_name,
          last_name: userCreation.last_name,
          email: userCreation.email
        }
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.message
      });
    }
  }

  // User login
  static async login(req, res) {
    try {
      const { mobile_number, password } = req.body;
      const findUser = await users.findOne({ where: { mobile_number } });
      if (!findUser) {
        return res.status(404).send({
          status: 404,
          message: "the user with this mobile_number doesn't exist"
        });
      }

      if (findUser.is_verify === 0) {
        return res.status(400).send({
          status: 400,
          message: "Your account is not verified"
        });
      }

      if (findUser.is_active === 0) {
        return res.status(400).send({
          status: 400,
          message: "Your account is not active"
        });
      }

      const checkPassword = Auth.passwordCompare(findUser.password, password);
      if (!checkPassword) {
        return res.status(400).send({
          status: 400,
          message: "The passwords do not match"
        });
      }

      const generateToken = Auth.generateToken(
        findUser.id,
        findUser.mobile_number,
        findUser.user_role
      );
      return res.status(200).send({
        status: 200,
        message: "You have successfully logged in",
        token: generateToken,
        user: {
          email: findUser.email,
          mobile_number: findUser.mobile_number,
          role: findUser.user_role
        }
      });
    } catch (e) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getAllUsers(req, res) {
    const { role, id } = req;

    try {
      if (!role.includes(1) && !role.includes(2)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin or Admin Permissions"
        });
      }
      const getUsers = await users.findAll({attributes: { exclude: ['password']}});
      if (role.includes(1)) {
        return res.status(200).send({
          status: 200,
          users: getUsers
        }); 
      }

      const getProfDetails = await prof_details.findAll() 
      let newUsersIds = []
      for(let i=0; i < getProfDetails.length; i++) {
        const getAllocatedBr = await prof_details.findOne({where: { user_id: id }})
        const branches = getAllocatedBr.allocated_branches
        const filterBranches = _.intersection(branches, getProfDetails[i].allocated_branches)
        if (!role.includes(1) && role.includes(2) && filterBranches.length > 0){
          newUsersIds.push(getProfDetails[i].user_id)
        } 
      }

      let newUsers = []
      for(let i=0; i < newUsersIds.length; i++){
        let data = {}
        const getData = await users.findOne({where: {id: newUsersIds[i]}})
        const getProfData = await prof_details.findOne({where: { user_id: newUsersIds[i]}, attributes: { exclude: ['updatedAt', 'createdAt', 'user_id']}})
        data['personal_details'] = getData
        data['professional_details'] = getProfData

        newUsers.push(data)
      }

      return res.status(200).send({
        status: 200,
        user: newUsers
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getOneUser(req, res) {
    const { role } = req;
    const { id } = req.params;

    try {
      if (!role.includes(1) && !role.includes(2)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin or Admin Permissions"
        });
      }

      const getUser = await users.findOne({ where: { id }, attributes: { exclude: ['password']} });
      if(!getUser) {
        return res.status(404).send({
          status: 404,
          message: 'The user with this Id is not found'
        })
      }
      const getProfDetails = await prof_details.findOne({ where: { user_id: getUser.id}})
      const getCity = await cities.findOne({where: {id: getUser.city_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
      const getState = await states.findOne({ where: {id: getUser.state_id }, attributes: { exclude: ['createdAt', 'updatedAt'] }})

      let all_branches = []
      for(let i = 0; i < getProfDetails.allocated_branches.length; i++) {
        const getData = await branch.findOne({where: { id: getProfDetails.allocated_branches[i]}, attributes: { exclude: ['createdAt', 'updatedAt'] }})
        all_branches.push(getData)
      }
      const user_data = {
        id: getUser.id,
        first_name: getUser.first_name,
        last_name: getUser.last_name,
        email: getUser.email,
        user_role: getUser.user_role,
        city_id: getCity,
        mobile_number: getUser.mobile_number,
        registration_id: getUser.registration_id,
        company_name: getUser.company_name,
        gender: getUser.gender,
        allocated_branches: all_branches,
        dob: getUser.dob,
        profile_image: getUser.profile_image,
        locality: getUser.locality,
        document: getUser.document,
        pin_code: getUser.pin_code,
        landmark: getUser.landmark,
        address: getUser.address,
        current_status: getUser.current_status,
        is_active: getUser.is_active,
        is_verify: getUser.is_verify,
        phone_verified: getProfDetails.phone_verified,
        allocated_products: getProfDetails.allocated_product,
        otp: getUser.otp,
        otp_request_at: getUser.otp_request_at,
        state_id: getState,
        join_date: getProfDetails.join_date,
        start_date: getProfDetails.start_date,
        charge_per_month: getProfDetails.charge_per_month,
        allocate_creche: getProfDetails.allocate_creche,
        status: getProfDetails.status,
        reg_id: getProfDetails.reg_id,
        services: getProfDetails.services,
        allocate_customer: getProfDetails.allocate_customer,
        allocate_appartment: getProfDetails.allocate_appartment,
        is_loc_ap: getProfDetails.is_loc_ap,
        specialization: getProfDetails.specialization,
        createdAt: getUser.createdAt
      }
      if (!getUser) {
        return res.status(404).send({
          status: 404,
          message: "The User with ID provided is not found"
        });
      }
      return res.status(200).send({
        status: 200,
        user: user_data
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }
  
  static async getUsersByRole(req, res) {
    const { role } = req
    const { role_id } = req.params

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const getUsers = await users.findAll({attributes: ['id', 'first_name', 'last_name', 'email', 'user_role', 'city_id', 'profile_image', 'mobile_number', 'is_active']})
      let users_data = []
      for(let i=0; i<getUsers.length; i++){
        if(getUsers[i].user_role.includes(parseInt(role_id,10))) {
          users_data.push(getUsers[i])
        }
      }

      return res.status(200).send({
        status: 200,
        users: users_data
      })

    } catch(error) {
      return res.status(500).send({
        status: 500,
        error: 'Something went wrong'
      })
    }
  }

  static async updateUser(req, res) {
    const { body, role } = req;
    const { id } = req.params;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const checkUser = await users.findOne({ where: { id } });
      if (!checkUser) {
        return res.status(404).send({
          status: 404,
          message: "The User with ID provided is not found"
        });
      }

      const updatingUser = await users.update(body, { where: { id } });
      if (updatingUser[0] === 0) {
        const allowedInputs = {
          first_name: "string",
          last_name: "string",
          city_id: "id",
          user_role: "id",
          registration_id: "id",
          company_name: "string",
          mobile_number: "integer",
          password: "password",
          gender: "string",
          dob: "string",
          profile_image: "string",
          document: "file",
          current_status: "string",
          otp: "integer"
        };

        return res.status(400).send({
          status: 400,
          message:
            "Please refer to this object on accepted inputs to update the user",
          accepted_inputs: allowedInputs
        });
      }
      return res.status(200).send({
        status: 200,
        message: "User updated successfully",
        updatedUser: updatingUser
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getAvailableNurses(req, res) {
    const { role, id } = req

    try {

      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      } 

      const getNurses = await users.findAll()
      let nursesData = []
      for(let i=0; i < getNurses.length; i++) {
        const getProf = await prof_details.findOne({where: { user_id: getNurses[i].id}})
        if( getNurses[i].user_role.includes(3) && getNurses[i].is_active === 1 && getProf.allocate_appartment === null) {
          nursesData.push(getNurses[i])
        }
      }

      return res.status(200).send({
        status: 200,
        nurses: nursesData
      })
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Something went wrong'
      })
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const { role } = req;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const getUser = await users.findOne({ where: { id } });
      if (!getUser) {
        return res.status(404).send({
          status: 404,
          message: "This user is not found"
        });
      }

      const deleteUser = await users.destroy({
        where: { id },
        returning: true
      });
      return res.status(200).send({
        status: 200,
        message: "The user deleted successfully",
        deletedUser: getUser
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }
}

export default Users;
