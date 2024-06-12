import {Router} from 'express'
import { forgotPassword, loginUser, logoutUser, registerUser } from '../controller/user.controller.js';

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/resetpassword').patch(forgotPassword)
export default router