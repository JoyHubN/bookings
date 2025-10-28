import prisma from '../prisma_client.js'

const checkSeats = async (event_id) => {
    const dataEvent = await prisma.events.findUnique({
        where: {
            id: event_id
        },
        include:{
            bookings: true
        }
    });

    if(dataEvent === null){
        return {
                 error: true,
                 code: 404, 
                 message: 'Такого мероприятия не существует'
               }
    };

    if(dataEvent.bookings.length >= dataEvent.total_seats){
        return { 
                 error: true,
                 code: 400, 
                 message: 'Упс... Кажется, все места уже забронированы' 
               }
    }

    return null

}

const createBooking = async ({user_id, event_id}) => {
    const result = await prisma.bookings.findUnique({
        where: {
            user_id_event_id: {
                user_id,
                event_id
            }
        },
        include: {
            events: true
        }
    });

    const resultCheckSeats = await checkSeats(event_id);

    if (resultCheckSeats === null){
        if(result === null){
            await prisma.bookings.create({
                data: {
                    user_id: user_id,
                    event_id,
                    created_at: new Date()
                }
            })
            return { 
                     error: false,
                     code: 201, 
                     message: 'Бронь создана' 
                   }
        }
        else{
            if(event_id === result.event_id){
                return { 
                         error: true, 
                         code: 400, 
                         message : 'Можно забронировать место только один раз на одно мероприятие' 
                       }
            }
            else{
                await prisma.bookings.create({
                    data: {
                        user_id: user_id,
                        created_at: new Date(),
                        event_id: event_id,
                    },
                    include:{
                        events: true
                    }
                });
                return { 
                         error: false,
                         code: 201, 
                         message: 'Бронь создана' 
                   }
            }
        }
    }
    else{
        return resultCheckSeats;
    }
}

export default createBooking;