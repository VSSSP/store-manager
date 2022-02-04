const salesSchema = require('../schemas/salesSchema');

const validateProductId = (req, res, next) => {
  const validProductId = salesSchema.productIdValidation(req.body);
  const findIncorrectProductId = validProductId.find((notValid) => notValid.code); 
  if (findIncorrectProductId) {
    const { code, message } = findIncorrectProductId;
    return res.status(code).json({ message });
  }
  next();
};

const validateQuantity = (req, res, next) => {
    const validQuantity = salesSchema.quantityValidation(req.body);
    const findIncorrectQuantity = validQuantity.find((notValid) => notValid.code);
    if (findIncorrectQuantity) {
      const { code, message } = findIncorrectQuantity;
        return res.status(code).json({ message });
    }
  next();
};

const validateIfSalesExistsById = async (req, res, next) => {
  const { id } = req.params;
  const salesCheck = await salesSchema.salesIdValidation(id);
  if (salesCheck.code === 404) {
    return res.status(salesCheck.code).json({ message: salesCheck.message });
  }
  next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  validateIfSalesExistsById,
};