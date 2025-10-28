import Joi from "joi";


export const dataSchemes = Joi.object({
    event_id: Joi.number().integer().required().positive()
        .messages({
                'number.integer': 'event_id должен быть целым числом',
                'number.positive': 'event_id должен быть положительным',
                'any.required': 'event_id обязателен'
            }),
    user_id: Joi.string().required()
        .messages({
                'any.required': 'user_id обязательно',
                'string.empty': 'user_id не может быть пустым'
                })
});