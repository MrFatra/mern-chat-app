//! Require Cookie Auth
import { Router } from 'express'
import { onSendMessage, onGetMessage } from '../controllers/message.js'
import protectMessage from '../middleware/protectRouteMessage.js'

const router = Router()

router.use(protectMessage)

router.get('/:id', onGetMessage)
router.post('/send/:id', onSendMessage)

export default router