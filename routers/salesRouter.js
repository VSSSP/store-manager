const { Router } = require('express');

const saleMiddlewares = require('../middlewares/saleMiddlewares');
const productsMiddlewares = require('../middlewares/productMiddlewares');

const salesController = require('../controllers/salesController');

const router = Router();

router.post('/', 
saleMiddlewares.validateProductId,
saleMiddlewares.validateQuantity,
productsMiddlewares.validateQuantityToSale,
salesController.registerSalesProducts);

router.get('/', salesController.getAll);

router.get('/:id', 
saleMiddlewares.validateIfSalesExistsById,
salesController.getSaleById);

router.put('/:id',
saleMiddlewares.validateIfSalesExistsById,
saleMiddlewares.validateProductId,
saleMiddlewares.validateQuantity,
salesController.editSale);

router.delete('/:id',
saleMiddlewares.validateIfSalesExistsById,
salesController.deleteSale);

module.exports = router;