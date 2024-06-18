import { Router } from "express";

import { deleteRecord, editRoom, getRooms, getUserRoom, roomRegister } from "../controller/room.controller.js";
import {upload} from '../middleware/multer.js'
import { verifyJWT } from "../middleware/authUser.js";

const router = Router();

router.route('/roomregister').post( upload.single("roomImage"), roomRegister)
router.route('/getrooms').get(getRooms)
router.route('/userRoom').get(getUserRoom)
router.route('/updateroom/:id').put( verifyJWT, upload.single("roomImage"), editRoom)
router.route('/deleteroom/:id').delete(verifyJWT,deleteRecord)


export default router