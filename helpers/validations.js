import Validate from 'celebrate';

const createUser = {
  body: {
    first_name: Validate.Joi.string().required(),
    last_name: Validate.Joi.string().required(),
    email: Validate.Joi.string().required().email(),
    mobile_number: Validate.Joi.number().required(),
    user_role: Validate.Joi.array().required(),
    city_id: Validate.Joi.number().required(),
    dob: Validate.Joi.string().required(),
    gender: Validate.Joi.number().required(),
    password: Validate.Joi.string().required(),
    state_id: Validate.Joi.number(),
    pin_code: Validate.Joi.number(),
    landmark: Validate.Joi.string(),
    address: Validate.Joi.string(),
    branch_id: Validate.Joi.number(),
    is_active: Validate.Joi.number(),
    locality: Validate.Joi.string(),
  },
};

const loginUser = {
  body: {
    mobile_number: Validate.Joi.number().required(),
    password: Validate.Joi.string().required(),
  },
};

const createLanguage = {
  body: {
    name: Validate.Joi.string().required()
  }
}

const createConfig = {
  body: {
    fetch_key: Validate.Joi.string().required(),
    value: Validate.Joi.string().required(),
  }
}

const getConfig = {
  body: {
    fetch_key: Validate.Joi.string().required(),
  }
}

const createBranch = {
  body: {
    city_id: Validate.Joi.number().required(),
    name: Validate.Joi.string().required(),
    is_active: Validate.Joi.number().required(),
  }
}

const createCategory = {
  body: {
    type: Validate.Joi.string().required(),
    is_active: Validate.Joi.number().required(),
    icon: Validate.Joi.string().required()
  }
}

const createTreatment = {
  body: {
    title: Validate.Joi.string().required(),
  }
}

const createTreatmentEvent = {
  body: {
    event: Validate.Joi.string().required(),
  }
}

const createService = {
  body: {
    product_id: Validate.Joi.number().required(),
    product_category_id: Validate.Joi.number().required(),
    title: Validate.Joi.string().required(),
    description: Validate.Joi.string().required(),
    icon: Validate.Joi.string().required(),
    price: Validate.Joi.number().required(),
    discount: Validate.Joi.number(),
  }
}

const createTreatmentPlan = {
  body: {
    title: Validate.Joi.string().required(),
    treatment_id: Validate.Joi.number().required(),
    events: Validate.Joi.array().required(),
  }
}

const createProductAllocation = {
  body: {
    name: Validate.Joi.string().required(),
    branch_id: Validate.Joi.number().required(),
    product_id: Validate.Joi.number().required(),
    address: Validate.Joi.string().required(),
    contact_number: Validate.Joi.number(),
    contact_person: Validate.Joi.string(),
    city_id: Validate.Joi.number().required(),
    state_id: Validate.Joi.number().required(),
    pincode: Validate.Joi.number(),
    is_active: Validate.Joi.number()
  }
}


export default {
  createUser,
  loginUser,
  createLanguage,
  createConfig,
  getConfig,
  createBranch,
  createCategory,
  createService,
  createTreatment,
  createTreatmentEvent,
  createTreatmentPlan,
  createProductAllocation
};