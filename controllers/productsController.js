const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const service = await productsService.register(name, quantity);
  const { code, product } = service;
  res.status(code).json(product);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const service = await productsService.edit(id, name, quantity);
  const { code, product } = service;
  res.status(code).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const service = await productsService.remove(id);
  const { code, product } = service;
  res.status(code).json(...product);
};

const getAll = async (_req, res) => {
  const service = await productsService.getAll();
  res.status(200).json(service.products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const service = await productsService.getProductById(id);
  const { code, product } = service;
  res.status(code).json(...product);
};

module.exports = {
  create,
  edit,
  remove,
  getAll,
  getProductById,
};