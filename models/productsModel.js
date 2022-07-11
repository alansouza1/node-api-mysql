const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [productData] = await connection.execute(query, [id]);

  if (productData.length === 0) return null;

  return productData[0];
};

module.exports = {
  getAll,
  findById,
};