

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
 *                      $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */