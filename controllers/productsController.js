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

  if (!name) return response.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return response
      .status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const { id } = await ProductService.create(name);

  const product = { id, name };

  response.status(201).json(product);
};

module.exports = {
  getAll,
  findById,
  create,
};