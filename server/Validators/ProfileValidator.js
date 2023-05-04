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

// Define the schema for the Education table
const educationSchema = Joi.object({
  degree: Joi.string().required(),
  major: Joi.string().allow(''),
  school: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().allow(null),
  description: Joi.string().allow(''),
});

// Define the schema for the Skill table
const skillSchema = Joi.object({
  name: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).default(1),
});

// Define the schema for the Experience table
const experienceSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string().allow(''),
  start_date: Joi.date().required(),
  end_date: Joi.date().allow(null),
  description: Joi.string().allow(''),
});

// Validate Education data
const validateEducation = (data) => {
  data.forEach(element => {
    const { error } = educationSchema.validate(element);
    return error ? error.details[0].message : null;
    
  });

};

// Validate Skill data
const validateSkill = (data) => {
  data.forEach(element => {
    const { error } = skillSchema.validate(element);
    return error ? error.details[0].message : null;
    
  });

};

// Validate Experience data
const validateExperience = (data) => {

  data.forEach(element => {
    const { error } = experienceSchema.validate(element);
    return error ? error.details[0].message : null;
  });

};


// Export the validateProfile middleware function
module.exports = { validateProfile,validateEducation,validateExperience,validateSkill};