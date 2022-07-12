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

const findById = async (itemsSold) => {
  const query = 'SELECT * FROM StoreManager.products';
  const [productData] = await connection.execute(query);

  const hasProducts = itemsSold.every(({ productId }) => {
    const result = productData.find(({ id }) => productId === id);

    return result;
  });

  if (!hasProducts) return null;

  return productData[0];
};

module.exports = {
  create,
  findById,
};