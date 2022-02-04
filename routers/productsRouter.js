const { Router } = require('express');

const middlewares = require('../middlewares/productMiddlewares');

const productsController = require('../controllers/productsController');

const router = Router();

router.post('/', 
middlewares.validateName, 
middlewares.validateQuantity, 
middlewares.validateIfProductExists, 
productsController.create);

router.get('/', productsController.getAll);

router.get('/:id', 
middlewares.validateIfProductExistsById, 
productsController.getProductById);

router.put('/:id', 
middlewares.validateName, 
middlewares.validateQuantity, 
middlewares.validateIfProductExists, 
middlewares.validateIfProductExistsById,
productsController.edit);

router.delete('/:id', 
middlewares.validateIfProductExistsById, 
productsController.remove);

module.exports = router;