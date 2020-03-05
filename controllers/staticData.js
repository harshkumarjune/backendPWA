import models from "../models";
import Auth from "../helpers/auth";

const { users, userRoles, languages, config, cities, states } = models;

class StaticData {
  // work on functionality to add the language
  static async addLanguage(req, res) {
    const { name } = req.body;
    const { role } = req

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }
      const checkLanguageExist = await languages.findOne({ where: { name } });
      if (checkLanguageExist) {
        return res.status(400).send({
          status: 400,
          message: "The language already exist"
        });
      }

      const saveLanguage = await languages.create({ name });

      return res.status(201).send({
        status: 200,
        message: "Language created",
        language: saveLanguage.name
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something Went Wrong"
      });
    }
  }

  static async getLanguages(req, res) {
    const { role } = req;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const renderLanguages = await languages.findAll();
      return res.status(200).send({
        status: 200,
        languages: renderLanguages
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getRoles(req, res) {
    const { role } = req;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const roles = await userRoles.findAll();
      return res.status(200).send({
        status: 200,
        roles
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getConfigValue(req, res) {
    const { role } = req;
    const { fetch_key } = req.query;

    try {
      const getValue = await config.findOne({ where: { fetch_key } });
      if (!getValue) {
        return res.status(404).send({
          status: 404,
          message: "The value with the fetch_key provided is not found"
        });
      }
      return res.status(200).send({
        status: 200,
        data: getValue
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async createdConfigValue(req, res) {
    const { role } = req;
    const { fetch_key, value } = req.body;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const getValue = await config.findOne({ where: { fetch_key } });
      if (getValue) {
        return res.status(404).send({
          status: 404,
          message: "The value with the fetch_key provided already exist"
        });
      }

      const createValue = await config.create({ fetch_key, value });
      return res.status(200).send({
        status: 200,
        data: createValue
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async updateConfigValue(req, res) {
    const { role, body } = req;
    const { fetch_key } = req.params;

    try {
      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const getValue = await config.findOne({ where: { fetch_key } });

      if (!getValue) {
        return res.status(404).send({
          status: 404,
          message: "The value with the fetch_key does not exist"
        });
      }

      const updateValue = await config.update(
        { fetch_key: body.fetch_key, value: body.value },
        { where: { id: getValue.id }, returning: true }
      );
      if (updateValue[0] === 0) {
        return res.status(400).send({
          status: 400,
          message: "Please Provide either fetch_key or value"
        });
      }
      return res.status(200).send({
        status: 200,
        updatedValue: updateValue[1]
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getCities(req, res) {
    const { role } = req;

    try{


        const getCities = await cities.findAll()
        return res.status(200).send({
            status: 200,
            cities: getCities
        })

    } catch (error) {
        return res.status(500).send({
          status: 500,
          error: "Something went wrong"
        });
      }
  }

  static async getCitiesInState(req, res) {
    const {role} = req
    const {state_id} = req.params

    try {
    const getStat = await states.findOne({where: { id: state_id}})
    if(!getStat) {
      return res.status(400).send({
        status: 400,
        error: "This State with ID you have provided does not exist"
      });
    }
    const getCities = await cities.findAll({where: {state_id}})
    if(getCities.length < 1){
      return res.status(400).send({
        status: 400,
        message: "No cities found"
      });
    }

    return res.status(200).send({
      status: 200,
      cities: getCities
    })
    } catch(error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }

  static async getStates(req, res) {
    const { role } = req;

    try{

        const getStates = await states.findAll()
        return res.status(200).send({
            status: 200,
            states: getStates
        })

    } catch (error) {
        return res.status(500).send({
          status: 500,
          error: "Something went wrong"
        });
      }
  }

  static async checkEmailAndPassword(req, res){
    const { email, mobile_number } = req.query
    const { role } = req;

    try{

      if (!role.includes(1)) {
        return res.status(401).send({
          status: 401,
          error: "This Action requires Super Admin Permissions"
        });
      }

      const checkEmail = await users.findOne({where: { email }})
      const checkPhone = await users.findOne({where: { mobile_number }})

      if( checkEmail && checkPhone ) {
        return res.status(200).send({
          status: 200,
          status: 1
        })
      }

      if( !checkEmail && !checkPhone ) {
        return res.status(200).send({
          status: 200,
          status: 0
        })
      }

      if( !checkEmail && checkPhone ) {
        return res.status(200).send({
          status: 200,
          status: 2
        })
      }

      if( checkEmail && !checkPhone ) {
        return res.status(200).send({
          status: 200,
          status: 3
        })
      }

    } catch(error){
      return res.status(500).send({
        status: 500,
        error: 'Something went wrong'
      })
    }
  }

  static async getCity(req, res) {
    const { role } = req;
    const city_id  = req.params.id;

    try {
      const getCity = await cities.findOne({ where: { id: city_id } });
      if (getCity.length < 1) {
        return res.status(400).send({
          status: 400,
          message: "No cities found"
        });
      }

      return res.status(200).send({
        status: 200,
        city: getCity
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }
  static async getState(req, res) {
    const { role } = req;
    const  state_id  = req.params.id;

    try {
      const getState = await states.findOne({ where: { id: state_id } });
      if (getState.length < 1) {
        return res.status(400).send({
          status: 400,
          message: "No cities found"
        });
      }

      return res.status(200).send({
        status: 200,
        state: getState
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "Something went wrong"
      });
    }
  }
}

export default StaticData;
