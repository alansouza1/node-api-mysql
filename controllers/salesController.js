const SalesService = require('../services/salesService');

const getAll = async (_request, response) => {
  const sales = await SalesService.getAll();

  response.status(200).json(sales);
};

const findById = async (request, response) => {
  const { id } = request.params;

  const sale = await SalesService.findById(id);

  if (!sale) return response.status(404).json({ message: 'Sale not found' });

  response.status(200).json(sale);
};

const create = async (request, response) => {
  const itemsSold = request.body;

  const { code, message, id } = await SalesService.create(itemsSold);

  if (!id) return response.status(code).json({ message });

  const sale = { id, itemsSold };

  response.status(code).json(sale);
};

module.exports = {
  getAll,
  findById,
  create,
};