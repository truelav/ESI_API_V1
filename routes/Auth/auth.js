import express from "express";
import * as AuthControllers from "../../controllers/Auth/AuthControllers.js";
const router = express.Router(); 



router.get("/refresh", AuthControllers.refresh);


/**
 * @openapi
 * /api/auth/users:
 *  get:
 *     tags:
 *     - Auth
 *     description: Get All users as list
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
router.get("/users", AuthControllers.getUsers);



router.get("/users/:id", AuthControllers.getSingleUser);



/**
* @openapi
* '/api/auth/login':
*  post:
*     tags:
*     - Auth
*     summary: Loggin In User
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/LoginRequestUser'
*     responses:
*       200:
*         description: Success
*         content:
*          application/json:
*           schema:
*              $ref: '#/components/schema/User'
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.post("/login", AuthControllers.login);



router.post("/logout", AuthControllers.logout);


/**
* @openapi
* '/api/auth/signup':
*  post:
*     tags:
*     - Auth
*     summary: Signup new User
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/SignupRequestUser'
*     responses:
*       200:
*         description: Success Signup, we will get back to you shortly
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.post("/signup", AuthControllers.signup)



/**
* @openapi
* '/api/auth/register':
*  post:
*     tags:
*     - Auth
*     summary: Admin registers new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/SignupRequestUser'
*     responses:
*       200:
*         description: Success Signup, user approved automatically
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.post("/register", AuthControllers.register);



/**
* @openapi
* '/api/auth/resetPassword':
*  post:
*     tags:
*     - Auth
*     summary: Resets user password
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 default: user@email.com
*
*     responses:
*       200:
*         description: Success Signup, user approved automatically
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.post("/register", AuthControllers.resetPassword);



/**
* @openapi
* '/api/auth/edit':
*  put:
*     tags:
*     - Auth
*     summary: Update user info
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/SignupRequestUser'
*     responses:
*       200:
*         description: Success Signup, user approved automatically
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.put("/users/edit", AuthControllers.editUser);


/**
* @openapi
* '/api/auth/activate/{id}':
*  put:
*     tags:
*     - Auth
*     summary: Activate / Deactivate user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schema/SignupRequestUser'
*     responses:
*       200:
*         description: Success 
*       403:
*         description: Forbidden
*       404:
*         description: User not found
*       500:
*         description: Something went wrong
*/
router.put("/users/activate/:id", AuthControllers.activateDeactivateUser);

router.delete("/users/:id", AuthControllers.deleteUser);

export default router;
