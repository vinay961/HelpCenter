import { Router } from "express";


import { roomRegister } from "../controller/room.controller.js";
import {upload} from '../middleware/multer.js'

const router = Router();

router.route('/roomregister').post( upload.single("roomImage"), roomRegister)


export default router