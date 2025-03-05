import Joi from "joi";

const accessoriesSchema = Joi.object({
    accessory_name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Accessory name must be a string',
      'string.min': 'Accessory name must be at least 3 characters long',
      'string.max': 'Accessory name must be less than 100 characters long',
      'any.required': 'Accessory name is required',
    }),
  
  productId: Joi.number()
    .integer()
    .greater(0)
    .required()
    .messages({
      'number.base': 'productId must be a number',
      'number.integer': 'productId must be an integer',
      'number.greater': 'productId must be greater than 0',
      'any.required': 'productId is required',
    }),
});

const accessoriesUpdateSchema = Joi.object({
    accessory_name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Accessory name must be a string',
      'string.min': 'Accessory name must be at least 3 characters long',
      'string.max': 'Accessory name must be less than 100 characters long',
      'any.required': 'Accessory name is required',
    }),
  });
export {accessoriesSchema, accessoriesUpdateSchema} ;
