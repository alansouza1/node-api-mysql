const connection = require('./connection');

const create = async (itemsSold) => {
  const [sale] = await connection
    .execute('INSERT INTO StoreManager.sales () VALUES ()');

  const { insertId } = sale;

  itemsSold.forEach(async ({ productId, quantity }) => {
    await connection
      .execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
      );
  });
  
  return insertId;
};

module.exports = {
  create,
};