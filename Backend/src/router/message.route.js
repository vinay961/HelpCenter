import {Router} from 'express'
import { messageHandle } from '../controller/message.controller.js'

const router = Router()

router.route('/message')