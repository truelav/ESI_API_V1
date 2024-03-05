/**
 * @openapi
 * components:
 *   schema:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           default: "65cbba33bc1b1eb18d40505c"
 *         email:
 *           type: string
 *           default: "user@email.com"
 *         name:
 *           type: string
 *           default: "User Name"
 *         company:
 *           type: string
 *           default: "Apple Inc"
 *         phone:
 *           type: string
 *           default: "0001234567"
 *         password:
 *           type: string
 *           default: password123
 *         isActive:
 *           type: boolean
 *           default: false
 *         role:
 *           type: string
 *           default: "CUSTOMER"
 *     LoginRequestUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           default: "user@email.com"
 *         password:
 *           type: string
 *           default: password123
 *     SignupRequestUser:
 *       type: object
 *       required:
 *        - email
 *        - name
 *        - company
 *        - phone
 *        - password
 *       properties:
 *         email:
 *           type: string
 *           default: "user@email.com"
 *         name:
 *           type: string
 *           default: "User Name"
 *         company:
 *           type: string
 *           default: "Apple Inc"
 *         phone:
 *           type: string
 *           default: "0001234567"
 *         password:
 *           type: string
 *           default: password123
 *         isActive:
 *           type: boolean
 *           default: true
 *         role:
 *           type: string
 *           default: "CUSTOMER"  
 */
