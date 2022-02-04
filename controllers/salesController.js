const salesService = require('../services/salesService');

const registerSalesProducts = async (req, res) => {
  const service = await salesService.registerSalesProducts(req.body);
  res.status(service.code).json({ id: service.id, itemsSold: req.body });
};

const getAll = async (_req, res) => {
  const service = await salesService.getAll();
  res.status(service.code).json(service.sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const service = await salesService.getSaleById(id);
  res.status(service.code).json(service.sale);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const service = await salesService.editSale(id, req.body);
  res.status(service.code).json({ saleId: service.id, itemUpdated: service.sales });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const allSales = await salesService.getAll();
  // console.log(allSales.sales);
  const service = await salesService.deleteSale(id, allSales.sales);
  res.status(service.code).json(service.sale);
};

module.exports = {
  registerSalesProducts,
  getAll,
  getSaleById,
  editSale,
  deleteSale,
};
