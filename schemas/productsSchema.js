const productsModel = require('../models/productsModel');

const nameValidation = (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
  return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
  return false;
};

const checkProductName = async (name) => {
  const productCheck = await productsModel.findProductByName(name);
  if (productCheck.length > 0) return { code: 409, message: 'Product already exists' };
  return false;
};

const findProduct = async (id) => {
  const checkProduct = await productsModel.findProductById(id);
  if (checkProduct.length === 0) return { code: 404, message: 'Product not found' };
  return checkProduct;
};

const quantityValidation = (quantity) => {
  if (!quantity && quantity !== 0) return { code: 400, message: '"quantity" is required' };
  if (quantity < 1 || typeof quantity !== 'number') {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
  return false;
};

const validateQuantityToSale = async (sales) => {
  const quantity = [];
  await Promise.all(sales.map(async (sale) => {
    const product = await productsModel.findProductById(sale.product_id);
    const productsSold = product[0].quantity - sale.quantity;
    quantity.push(productsSold);
  }));
  const quantityCheck = quantity.some((amount) => amount < 0);
  if (quantityCheck) {
    return { code: 422, message: 'Such amount is not permitted to sell' };
  }
  return false;
};

module.exports = {
  nameValidation,
  quantityValidation,
  checkProductName,
  findProduct,
  validateQuantityToSale,
};