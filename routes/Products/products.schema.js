/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - model
 *        - brand
 *        - description
 *        - price
 *        - image
 *        - isActive
 *       properties:
 *         _id:
 *           type: string
 *           default: "818279010800"
 *         model:
 *           type: string
 *           default: "ACHOM-001"
 *         brand:
 *           type: string
 *           default: "Go Pro"
 *         description:
 *           type: string
 *           default: "Headstrap + quickclip -black"
 *         category:
 *           type: string
 *           default: "ACCESSORIES - MISC"
 *         price:
 *           type: number
 *           default: 879.99
 *         quantity:
 *           type: number
 *           default: 99
 *         image:
 *           type: string
 *           default: "https://i.imgur.com/QlRphfQ.jpg"
 *         isActive:
 *           type: boolean
 *           default: true
 *         features:
 *           type: array
 *           default: ["feature 1", "feature 2"]
 *     productResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         model:
 *           type: string
 *         brand:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         features: 
 *           type: [string]
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         image:
 *           type: string
 *         upc:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string       
 *         isActive:
 *           type: boolean
 *     brandedProductResponse:
 *       type: object
 *       propreties:
 *         _id:
 *           type: string
 *  
 */
