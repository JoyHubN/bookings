import createBooking from '../db_func/create_booking.js'

class ControllerEndpoints{
    async bookingFunc(req, res){
        const { event_id, user_id } = req.validatedBody;

        const { error, code, message } = await createBooking({user_id, event_id})
        
        return res.status(code).json({error, message})
    }  
}

export default new ControllerEndpoints();