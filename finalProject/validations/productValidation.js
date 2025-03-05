import Joi from "joi";

const productSchema = Joi.object({
  product_name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Product name must be a string',
      'string.min': 'Product name must be at least 3 characters long',
      'string.max': 'Product name must be less than 100 characters long',
      'any.required': 'Product name is required',
    }),
  
  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.greater': 'Price must be greater than 0',
      'any.required': 'Price is required',
    }),
  
  description: Joi.string()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description must be at least 5 characters long',
      'string.max': 'Description must be less than 500 characters long',
      'any.required': 'Description is required',
    }),
  
  userId: Joi.number()
    .integer()
    .greater(0)
    .required()
    .messages({
      'number.base': 'UserId must be a number',
      'number.integer': 'UserId must be an integer',
      'number.greater': 'UserId must be greater than 0',
      'any.required': 'UserId is required',
    }),
});

const productUpdateSchema = Joi.object({
    product_name: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.base': 'Product name must be a string',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be less than 100 characters long',
        'any.required': 'Product name is required',
      }),
    
    price: Joi.number()
      .greater(0)
      .required()
      .messages({
        'number.base': 'Price must be a number',
        'number.greater': 'Price must be greater than 0',
        'any.required': 'Price is required',
      }),
    
    description: Joi.string()
      .min(5)
      .max(500)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least 5 characters long',
        'string.max': 'Description must be less than 500 characters long',
        'any.required': 'Description is required',
      }),
  });
export {productSchema, productUpdateSchema} ;
