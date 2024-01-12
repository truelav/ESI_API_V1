import User from '../../models/User/User.js';
import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';

export const placeOrder = async (req, res, next) => {
    try {
        console.log(req.body)

        const {cart, profile} = req.body
        const { email, id } = profile 
        const { products } = cart
        // const user = await User.findOneAndUpdate(email, { $push: orders, products })
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {$push: { orders: cart }},
            { new: true, useFindAndModify: false }
        )

        res.status(200).json({message: "Order placed successful", updatedUser})

    } catch(error){
        console.log(error);
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
}