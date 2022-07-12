const ProductModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) return null;

  return product;
};

const validate = (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }

  return {};
};

const create = async (name) => {
  const validations = validate(name);

  if (validations.message) return validations;

  const id = await ProductModel.create(name);

  return { code: 201, id };
};

const update = async (name, id) => {
  const validations = validate(name);

  if (validations.message) return validations;

  const affectedRows = await ProductModel.update(name, id);

  if (!affectedRows) return { code: 404, message: 'Product not found' };

  return { code: 200, affectedRows };
};

const deleteProduct = async (id) => {
  const affectedRows = await ProductModel.deleteProduct(id);

  if (!affectedRows) return { code: 404, message: 'Product not found' };

  return { code: 204, affectedRows };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};