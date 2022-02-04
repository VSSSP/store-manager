const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const registerSalesProducts = async (sales) => {
  const newSale = await salesModel.registerSale(sales);
  await Promise.all(sales.map(async (sale) => {
    const product = await productsModel.findProductById(sale.product_id);
    const quantity = product[0].quantity - sale.quantity;
    return productsModel.updateProduct(sale.product_id, quantity);
  }));
  return { code: 201, id: newSale };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { code: 200, sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return { code: 200, sale };
};

const editSale = async (id, sales) => {
  await salesModel.editSale(id, sales);
  return { code: 200, id, sales };
};

const deleteSale = async (id) => {
  const saleDeleted = await salesModel.getSaleById(id);
  await Promise.all(saleDeleted.map(async (sale) => {
    const salesQuantity = await salesModel.getQuantity(sale.product_id);
    const productQuantity = await productsModel.getQuantity(sale.product_id);
    console.log(salesQuantity);
    console.log(productQuantity);
    const updateQuantity = productQuantity[0].quantity + salesQuantity;
    await productsModel.updateProduct(sale.product_id, updateQuantity);
  }));
  await salesModel.deleteSale(id);
  return { code: 200, sale: saleDeleted };
};

module.exports = {
  registerSalesProducts,
  getAll,
  getSaleById,
  editSale,
  deleteSale,
};
