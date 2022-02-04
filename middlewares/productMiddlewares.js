const productsSchema = require('../schemas/productsSchema');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const validName = productsSchema.nameValidation(name);
  if (validName) return res.status(validName.code).json({ message: validName.message });
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validQuantity = productsSchema.quantityValidation(quantity);
  if (validQuantity) {
    return res.status(validQuantity.code).json({ message: validQuantity.message });
  }
  next();
};

const validateIfProductExists = async (req, res, next) => {
  const { name } = req.body;
  const productCheck = await productsSchema.checkProductName(name);
  if (productCheck) return res.status(productCheck.code).json({ message: productCheck.message });
  next();
};

const validateIfProductExistsById = async (req, res, next) => {
  const { id } = req.params;
  const productFind = await productsSchema.findProduct(id);
  if (productFind.code === 404) {
    return res.status(productFind.code).json({ message: productFind.message });
  }
  next();
};

const validateQuantityToSale = async (req, res, next) => {
  const service = await productsSchema.validateQuantityToSale(req.body);
  if (service) return res.status(service.code).json({ message: service.message });
  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateIfProductExists,
  validateIfProductExistsById,
  validateQuantityToSale,
};