const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const register = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const findProductByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  return result;
};

const findProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const editProduct = async (id, name, quantity) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  console.log(`não chores lint ${result}`);
  return {
    id,
    name,
    quantity,
  };
};

const removeProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

const updateProduct = async (id, quantity) => {
  await connection.execute(
    'UPDATE products SET quantity = ? WHERE id = ?',
    [quantity, id],
  );
};

const getQuantity = async (id) => {
  const [result] = await connection.execute(
    'SELECT quantity FROM products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  register,
  findProductByName,
  getAll,
  findProductById,
  editProduct,
  removeProduct,
  updateProduct,
  getQuantity,
};