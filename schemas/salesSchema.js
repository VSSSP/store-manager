const salesModel = require('../models/salesModel');

const productIdValidation = (body) => {
  const validation = body.map((sales) => {
    if (!sales.product_id) return { code: 400, message: '"product_id" is required' };
    return {
      message: '',
    };
  });
  return validation;
};

const quantityValidation = (body) => {
  const validation = body.map(({ quantity }) => {
    if (!quantity && quantity !== 0) return { code: 400, message: '"quantity" is required' };
    if (quantity < 1 || typeof quantity !== 'number') {
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    }
    return {
      message: '',
    };
  });
  return validation;
};

const salesIdValidation = async (id) => {
  const checkSale = await salesModel.getSaleById(id);
  if (checkSale.length === 0) return { code: 404, message: 'Sale not found' };
  return checkSale;
};
 
module.exports = {
  productIdValidation,
  quantityValidation,
  salesIdValidation,
};