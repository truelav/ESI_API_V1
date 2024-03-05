
export const getUserOrders = async (req, res, next) => {
    try {
    //   const orders = await Order.find({});
  
    //   if (!orders) {
    //     res.status(400).json({ message: "no users found", orders: [] });
    //   }
  
      return res.status(200).json('orders');
    } catch (error) {
      next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
};
  

