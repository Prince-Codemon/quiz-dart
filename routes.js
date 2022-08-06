const router = require('express').Router()
const UserController = require('../backend/controllers/userController')

router.post('/api/register', UserController.register )
router.post('/api/login', UserController.login )
router.post('/api/validate', UserController.validateToken)
router.post('/api/addquiz', UserController.addQuiz)
router.post('/api/getquizzes', UserController.getQuizzes)
module.exports = router  