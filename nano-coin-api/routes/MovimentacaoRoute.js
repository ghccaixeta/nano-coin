const router = require('express').Router()

const MovimentacaoController = require('../controllers/MovimentacaoController')

router.post('/add', MovimentacaoController.save)
router.get('/', MovimentacaoController.list)
router.get('/count', MovimentacaoController.count)
router.get('/funcionario/:id', MovimentacaoController.getByFuncionarioId)
router.get('/:id', MovimentacaoController.getById)


module.exports = router
