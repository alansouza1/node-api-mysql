const SalesModel = require('../models/salesModel');

const validate = async (itemsSold) => {
  const hasProductId = itemsSold.every(({ productId }) => productId !== undefined);
  if (!hasProductId) return { code: 400, message: '"productId" is required' };

  const hasQuantity = itemsSold.every(({ quantity }) => quantity !== undefined);
  if (!hasQuantity) return { code: 400, message: '"quantity" is required' };

  const isQuantityGreaterThanZero = itemsSold.every(({ quantity }) => quantity > 0);
  if (!isQuantityGreaterThanZero) {
    return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  
  const hasProduct = await SalesModel.findById(itemsSold);
  if (!hasProduct) return { code: 404, message: 'Product not found' };

  return {};
};

const create = async (itemsSold) => {
  const validations = await validate(itemsSold);

  if (validations.message) return validations;

  const id = await SalesModel.create(itemsSold);

  return { code: 201, id };
};

module.exports = {
  create,
};