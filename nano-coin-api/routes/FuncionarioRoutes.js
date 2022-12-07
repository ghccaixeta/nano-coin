const router = require('express').Router()

const FuncionarioController = require('../controllers/FuncionarioController')

router.get('/', FuncionarioController.list)
router.post('/add', FuncionarioController.save)
router.get('/count', FuncionarioController.count)
router.get('/:id', FuncionarioController.getById)
router.put('/edit/:id', FuncionarioController.update)
router.delete('/destroy/:id', FuncionarioController.destroy)



module.exports = router