const SalesModel = require('../models/salesModel');

const create = async (itemsSold) => {
  const id = await SalesModel.create(itemsSold);

  return id;
};

module.exports = {
  create,
};