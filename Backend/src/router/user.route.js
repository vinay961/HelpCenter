import {Router} from 'express'
import { 
    changePassword,
    checkAuth,
    deleteProfile, 
    forgotPassword, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateProfile 
} from '../controller/user.controller.js';
import {upload} from '../middleware/multer.js'

const router = Router();

router.route('/register').post( upload.single("avatar"), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/resetpassword').patch(forgotPassword)
router.route('/changepassword').patch(changePassword)
router.route('/updateprofile').put( upload.single("avatar"), updateProfile)
router.route('/deleteprofile').delete(deleteProfile)
router.route('/checkauth').get(checkAuth)

export default router