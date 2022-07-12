const SalesService = require('../services/salesService');

const create = async (request, response) => {
  const itemsSold = request.body;

  const { code, message, id } = await SalesService.create(itemsSold);

  if (!id) return response.status(code).json({ message });

  const sale = { id, itemsSold };

  response.status(code).json(sale);
};

module.exports = {
  create,
};