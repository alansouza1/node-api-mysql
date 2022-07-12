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

const create = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  } 

  const id = await ProductModel.create(name);

  return { code: 201, id };
};

module.exports = {
  getAll,
  findById,
  create,
};