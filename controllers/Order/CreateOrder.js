import createError from 'http-errors';
import { HTTPStatusCodes } from "../../utils/constants.js";
import { saveOrderService } from '../../services/orders/order_services.js';

// Order.Schema = {
//     cart: [
//         {} - productObject
//     ],
//     user: {
//         email: "",
//         id: "",
//         role: ""
//     }
// }

export const createOrder = async (req, res, next) => {
    try {
        const saveOrderResult = await saveOrderService(req.body)

        if(!saveOrderResult){
            res.status(404).json({message: "The was an error with placing your order, please try again later or log out and then log In again"})
            return
        }
    
        res.status(200).json({
            message: `The Order was place with success`,
            saveOrderResult
        });
        return
  
    } catch(error){
        next(createError(HTTPStatusCodes.InternalServerError, error.message))
    }
}