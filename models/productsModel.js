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

const create = async (name) => {
  const [result] = await connection
    .execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );

  return result.insertId;
};

const update = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  const { affectedRows } = result;

  if (affectedRows === 0) return null;

  return affectedRows;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  const { affectedRows } = result;

  if (affectedRows === 0) return null;

  return affectedRows;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};