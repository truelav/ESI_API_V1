import express from "express";
import * as ProductControllers from "../../controllers/Product/index.js";
import { upload } from "../../middleware/upload/index.js";
import { uploadProductsFile } from "../../middleware/upload/uploadProductsFile.js";

const router = express.Router();

/**
 * @openapi
 * /api/products:
 *  get:
 *     tags:
 *     - Product
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schema/productResponse'
 *       404:
 *         description: Product not found
 */
router.get("/", ProductControllers.getAllProducts);

/**
 * @openapi
 * /api/products/brandedProducts:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get branded products categorized by category
 *     description: Retriveves products categorized on brands or categories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  category:
 *                    type: string
 *                    description: The category of products.
 *                  products:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schema/productResponse'
 *       404:
 *         description: Product not found
 */
router.get("/brandedProducts", ProductControllers.getBrandedProducts);

/**
 * @openapi
 * /api/products/transformedProducts:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get branded products categorized by category
 *     description: Retriveves products categorized on brands or categories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  category:
 *                    type: string
 *                    description: The category of products.
 *                  products:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schema/productResponse'
 *       404:
 *         description: Product not found
 */
router.get("/transformedProducts", ProductControllers.getTransformedProductsBy)


 /**
 * @openapi
 * '/api/products/{id}':
 *  get:
 *     tags:
 *     - Product
 *     summary: Get a single product by the id
 *     description: Retrieve a product based on its ID.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/productResponse'
 *       404:
 *         description: Product not found
 */
router.get("/:id", ProductControllers.getSingleProduct);


 /**
 * @openapi
 * '/api/products/{id}':
 *  delete:
 *     tags:
 *     - Product
 *     summary: Delete a single product
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.delete("/:id", ProductControllers.deleteSingleProduct);



/**
 * @openapi
 * /api/products:
 *   delete:
 *     tags:
 *     - Product
 *     summary: Delete products by IDs
 *     description: Deletes products based on the provided array of product IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *               format: uuid
 *             example: ["818279010800", "818279010802", "818279010804"]
 *     responses:
 *       200:
 *         description: Products deleted successfully.
 *       400:
 *         description: Invalid request. Please provide an array of product IDs.
 *       404:
 *         description: Products not found.
 */
 router.delete("/", ProductControllers.deleteMultipleProducts);



 /**
 * @openapi
 * '/api/products/{id}':
 *  put:
 *     tags:
 *     - Product
 *     summary: Update a single product
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Product'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/productResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.put("/:id", upload.single("images"), ProductControllers.editSingleProduct);


/**
* @openapi
* '/api/products/{id}':
*  post:
*     tags:
*     - Product
*     summary: Create a single product
*     parameters:
*      - name: id
*        in: path
*        description: The id of the product
*        required: true
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/Product'
*     responses:
*       200:
*         description: Success
*         content:
*          application/json:
*           schema:
*              $ref: '#/components/schema/productResponse'
*       403:
*         description: Forbidden
*       404:
*         description: Product not found
*/
router.post("/", upload.single("image"), ProductControllers.addSingleProduct);


/**
 * @openapi
 * /api/products/addMultiple:
 *   put:
 *     tags:
 *     - Product
 *     summary: Upload CSV file for products,
 *     description: Uploads a CSV file containing products,  if product not available it will create one, it available it will update it
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CSV file uploaded successfully.
 *         content:
 *         schema: 
 *           type: object
 *           properties:
 *             message: string
 *       400:
 *         description: Invalid request. Please provide a CSV file.
 */
router.post("/addMultiple", uploadProductsFile.single("csv"), ProductControllers.addMultipleProducts);

export default router;
