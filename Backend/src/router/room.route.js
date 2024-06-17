import { Router } from "express";


import { getRooms, getUserRoom, roomRegister } from "../controller/room.controller.js";
import {upload} from '../middleware/multer.js'

const router = Router();

router.route('/roomregister').post( upload.single("roomImage"), roomRegister)
router.route('/getrooms').get(getRooms)
router.route('/userRoom').get(getUserRoom)


export default router