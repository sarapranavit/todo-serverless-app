import * as Joi from 'joi'

export const todoIdSchema = {
    "params":  Joi.object({
        id: Joi.string().guid().required()
    }).options({
        "abortEarly": false,
        "allowUnknown": true
    })
}

export const createTodoSchema = {
    "payload": Joi.object({
        name: Joi.string().required(),
        dueDate: Joi.date().required(),
        descrption: Joi.string().required()
    }).options({
        "abortEarly": false,
        "allowUnknown": true
    })
}
   

export const updateTodoSchema = {
    "params":  Joi.object({
        id: Joi.string().guid().required()
    }),
    "payload":  Joi.object({
        name: Joi.string().optional(),
        dueDate: Joi.date().optional(),
        descrption: Joi.string().optional()
    }).options({
        "abortEarly": false,
        "allowUnknown": true
    })
}
   