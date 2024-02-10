import { Router } from 'express'
import onLogin from '../controllers/login.js'
import onSignUp from '../controllers/signup.js'
import onLogOut from '../controllers/logout.js'

const router = Router()

router.post('/signup', onSignUp)

router.post('/login', onLogin)

router.post('/logout', onLogOut)

export default router