const productsModel = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { code: 200, products };
};

const getProductById = async (id) => {
  const productFind = await productsSchema.findProduct(id);
  return { code: 200, product: productFind };
};

const register = async (name, quantity) => {
  const product = await productsModel.register(name, quantity);
  return { code: 201, product };
};

const edit = async (id, name, quantity) => {
  const editedProduct = await productsModel.editProduct(id, name, quantity);
  return { code: 200, product: editedProduct };
};

const remove = async (id) => {
  const productToRemove = await productsSchema.findProduct(id);
  await productsModel.removeProduct(id);
  return { code: 200, product: productToRemove };
};

module.exports = { 
  register, 
  getAll, 
  getProductById, 
  edit, 
  remove,
};
