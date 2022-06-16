//import * as Joi from 'joi'
import * as Validators from "../validators/validator"

export const middyValidator = (validator) => {
    if(!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`)

    return async (req, res, next) => {
        try {

            if(Validators[validator].payload){
                const validated = await Validators[validator].payload.validateAsync(req.body)
                req.body = validated
            }
            if(Validators[validator].params){
                const validated = await Validators[validator].params.validateAsync(req.params)
                req.params = validated
            }
            next()
        }
        catch (err) {
            if(err.isJoi)
                return next(res.json(400, {"message": err.message}))
        }
    }
}