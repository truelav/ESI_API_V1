import createError from 'http-errors';
import User from "../../models/User/User.js";
import Order from '../../models/Order/Order.js';
import { HTTPStatusCodes } from "../../utils/constants.js";

export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({});
  
      if (!orders) {
        res.status(400).json({ message: "no users found", orders: [] });
      }
  
      return res.json(orders);
    } catch (error) {
      next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
};

export const placeOrder = async (req, res, next) => {
  try {
    console.log(req.body)

    if(!req.body.user || !req.body.cart){
      return res.status(500).json({ message: "The was an error with placing your order, please try again later" })
    }

    const userId = req.body.user.id
    const userEmail = req.body.user.email
    
    const user = {userId, userEmail}

    const orderSummary = {
      totalAmount: req.body.cart.totalAmount,
      totalProducts: req.body.cart.products.length
    }
    const products = req.body.cart.products
    const newOrder = new Order({ user, orderSummary, products })

    await newOrder.save()

    res.status(200).json({
      message: `The Order was place with success`,
      newOrder,
    });

  } catch(error){
    next(createError(HTTPStatusCodes.InternalServerError, error.message))
  }
}
  
export const deleteOrder = async (req, res, next) => {
  try {
    console.log(req)
  } catch(error){
    next(createError(HTTPStatusCodes.InternalServerError, error.message))
  }
}