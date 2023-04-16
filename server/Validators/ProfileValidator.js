const Joi = require('joi'); // Import the Joi validation library

// Define a schema for the Profile model using Joi
const profileSchema = Joi.object({
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().max(255).required(),
  mobile_number: Joi.string().max(255).allow(''),
  portfolio: Joi.string().max(255).allow(''),
  address: Joi.string().max(255).allow(''),
  carrier_objective: Joi.string().allow(''),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso()
});

// Define a validation middleware function that uses the profileSchema to validate the request body
function validateProfile(body) {
  const { error } = profileSchema.validate(body);

  if (error) {
    // If there are validation errors, return a 400 Bad Request response with the error message
    return error;
  }
}

// Export the validateProfile middleware function
module.exports = { validateProfile };