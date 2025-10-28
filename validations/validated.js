export function checkBody(schema){
    return (req, res, next)=>{
        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'body обязателен'})
        }

        const validationResult = schema.validate(req.body, { abortEarly: false });
        
        if(validationResult.error){
            return res.status(400).json(validationResult.error.details)
        }
        req.validatedBody = validationResult.value;
        next();
    }
}