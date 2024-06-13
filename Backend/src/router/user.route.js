import {Router} from 'express'
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser } from '../controller/user.controller.js';

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/resetpassword').patch(forgotPassword)
router.route('/changepassword').patch(changePassword)
export default router