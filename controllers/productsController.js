const ProductService = require('../services/productsService');

const getAll = async (_request, response) => {
  const products = await ProductService.getAll();

  response.status(200).json(products);
};

const findById = async (request, response) => {
  const { id } = request.params;

  const product = await ProductService.findById(id);

  if (!product) return response.status(404).json({ message: 'Product not found' });

  response.status(200).json(product);
};

const create = async (request, response) => {
  const { name } = request.body;

  const { code, message, id } = await ProductService.create(name);
  
  if (!id) return response.status(code).json({ message });

  const product = { id, name };

  response.status(code).json(product);
};

module.exports = {
  getAll,
  findById,
  create,
};