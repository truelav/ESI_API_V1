import createError from 'http-errors';
import { HTTPStatusCodes } from '../../utils/constants.js';
import Product from "../../models/Product/Product.Schema.js";
import { createPDFService } from "../../services/presentation/presentation_services.js";

export const createPDFPresentation = async (req, res, next) => {
    try {
        console.log(req.body);
        const prodIDs = req.body; // should be an array of IDs

        if (prodIDs.length === 0) {
            res.status(300).json({
                message:
                    "there are no products selected to create presentation",
            });
            return;
        }

        const productDetails = await Product.find({ _id: { $in: prodIDs } });

        if (!productDetails) {
            res.status(300).json({ message: "Oooops something went wrong in retreiving Products" });
            return;
        }

        const isSuccess = await createPDFService(productDetails)
          
        res.status(200).json({
            message: "Presentation Created Success",
            presentationLink: `http://localhost:8888/static/presentation.pdf`,
            isSuccess
        });

    } catch (error) {
        console.log(error);
        next(createError(HTTPStatusCodes.InternalServerError, error.message));
    }
};
