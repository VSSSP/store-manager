const connection = require('./connection');

const registerSale = async (sales) => {
  const [result] = await connection.query(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );

  await Promise.all(sales.map(async (sale) => {
    try {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [result.insertId, sale.product_id, sale.quantity],
      );
    } catch (error) {
      console.log(error);
    }
  }));
  return result.insertId;
};

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT sp.sale_id as saleId, '
    + 's.date, sp.product_id, sp.quantity '
    + 'FROM sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id',
    );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return result;
};

const editSale = async (id, sales) => {
  await Promise.all(sales.map(async (sale) => {
    try {
      await connection.execute(
        'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
        [sale.product_id, sale.quantity, id],
      );
    } catch (error) {
      console.log(error);
    }
  }));
  return {
    id,
    sales,
  };
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  return id;
};

const getQuantity = async (id) => {
  const [result] = await connection.execute(
    'SELECT quantity FROM sales_products WHERE product_id = ?',
    [id],
    );
  return result[0].quantity;
};
 
module.exports = {
  registerSale,
  getAll,
  getSaleById,
  editSale,
  deleteSale,
  getQuantity,
};