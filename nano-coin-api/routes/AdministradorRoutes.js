const router = require('express').Router()

const AdministradorController = require('../controllers/AdministradorController')

router.get('/', AdministradorController.list)
router.post('/add', AdministradorController.save)
router.get('/count', AdministradorController.count)
router.get('/:id', AdministradorController.getById)
router.put('/edit/:id', AdministradorController.update)
router.delete('/destroy/:id', AdministradorController.destroy)

module.exports = router