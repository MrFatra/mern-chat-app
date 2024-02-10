import { Router } from 'express'
import protectMessage from '../middleware/protectRouteMessage.js'
import onGetUserConversation from '../controllers/conversation.js'
import onSearch from '../controllers/search.js';

const router = Router()

router.use(protectMessage)

router.get('/conversation', onGetUserConversation)
router.get('/conversation/:name', onGetUserConversation)

export default router