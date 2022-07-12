const SalesService = require('../services/salesService');

const create = async (request, response) => {
  const itemsSold = request.body;

  const id = await SalesService.create(itemsSold);

  const product = { id, itemsSold };

  response.status(201).json(product);
};

module.exports = {
  create,
};