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

const update = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const { code, message, affectedRows } = await ProductService.update(name, id);

  if (!affectedRows) return response.status(code).json({ message });

  const product = { id, name };

  response.status(code).json(product);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;

  const { code, message, affectedRows } = await ProductService.deleteProduct(id);

  if (!affectedRows) return response.status(code).json({ message });

  response.status(code).end();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};