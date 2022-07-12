const connection = require('./connection');

const serialize = (sale) => ({
  saleId: sale.id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const getAll = async () => {
  const firstPart = 'SELECT t1.id, t1.date, t2.product_id, t2.quantity FROM StoreManager.sales';
  const secondPart = 'AS t1 INNER JOIN StoreManager.sales_products AS t2 ON t1.id = t2.sale_id';
  const query = `${firstPart} ${secondPart}`;

  const [sales] = await connection.execute(query);

  return sales.map(serialize);
};

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

const findProductById = async (itemsSold) => {
  const query = 'SELECT * FROM StoreManager.products';
  const [productData] = await connection.execute(query);

  const hasProducts = itemsSold.every(({ productId }) => {
    const result = productData.find(({ id }) => productId === id);

    return result;
  });

  if (!hasProducts) return null;

  return productData[0];
};

const findSaleById = async (id) => {
  const firstPart = 'SELECT t1.date, t2.product_id, t2.quantity FROM StoreManager.sales';
  const secondPart = 'AS t1 INNER JOIN StoreManager.sales_products AS t2';
  const thirdPart = 'ON t1.id = ? AND t1.id = t2.sale_id';
  const query = `${firstPart} ${secondPart} ${thirdPart}`;

  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;

  return sale.map(serialize);
};

module.exports = {
  getAll,
  findProductById,
  findSaleById,
  create,
};