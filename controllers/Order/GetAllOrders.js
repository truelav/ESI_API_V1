import createError from 'http-errors';
import { HTTPStatusCodes } from "../../utils/constants.js";
import { getAllOrdersService } from "../../services/orders/order_services.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrdersService()
        console.log(orders)
        if (!orders) {
            res.status(400).json({ message: "no users found", orders: [] });
        }
    
        return res.status(200).json(orders);
    } catch (error) {
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
};
  

