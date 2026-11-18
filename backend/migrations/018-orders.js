// A purchase becomes an order with an explicit status and lines of its own, and
// a cart is only ever the bag being filled. Paid carts move over as paid orders
// with the prices they were bought at. Each statement changes one thing, which
// TiDB requires.
module.exports = {
  up: async ({ context: sequelize }) => {
    // cart_id names the cart an order came from, so paying it again finds the
    // same order. The cart itself is gone by then, so it is not a foreign key.
    await sequelize.query(`CREATE TABLE Orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      cart_id INT NOT NULL,
      status VARCHAR(16) NOT NULL,
      paid_at DATETIME NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      CONSTRAINT orders_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
      CONSTRAINT orders_cart_unique UNIQUE (cart_id),
      CONSTRAINT orders_status CHECK (status IN ('pending', 'paid', 'cancelled')),
      CONSTRAINT orders_paid_at CHECK (status <> 'paid' OR paid_at IS NOT NULL)
    )`);
    await sequelize.query(`CREATE TABLE OrderLines (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      amount INT NOT NULL,
      unit_price_ore INT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      CONSTRAINT order_lines_order FOREIGN KEY (order_id) REFERENCES Orders (id) ON DELETE CASCADE,
      CONSTRAINT order_lines_product FOREIGN KEY (product_id) REFERENCES Products (id),
      CONSTRAINT order_lines_order_product_unique UNIQUE (order_id, product_id),
      CONSTRAINT order_lines_amount_positive CHECK (amount > 0),
      CONSTRAINT order_lines_price_not_negative CHECK (unit_price_ore >= 0)
    )`);

    await sequelize.query(`INSERT INTO Orders (user_id, cart_id, status, paid_at, createdAt, updatedAt)
      SELECT user_id, id, 'paid', paid_at, createdAt, updatedAt FROM Carts WHERE paid = 1`);
    await sequelize.query(`INSERT INTO OrderLines (order_id, product_id, amount, unit_price_ore, createdAt, updatedAt)
      SELECT o.id, r.product_id, r.amount, r.unit_price_ore, r.createdAt, r.updatedAt
      FROM CartRows r JOIN Orders o ON o.cart_id = r.cart_id`);
    await sequelize.query('DELETE r FROM CartRows r JOIN Carts c ON c.id = r.cart_id WHERE c.paid = 1');
    await sequelize.query('DELETE FROM Carts WHERE paid = 1');

    // With paid carts gone, each user has at most one cart, and the generated
    // column that allowed one unpaid cart beside many paid ones is not needed.
    await sequelize.query('ALTER TABLE Carts DROP INDEX carts_one_active_per_user');
    await sequelize.query('ALTER TABLE Carts DROP COLUMN active_user_id');
    await sequelize.query('ALTER TABLE Carts DROP COLUMN paid_at');
    await sequelize.query('ALTER TABLE Carts DROP COLUMN paid');
    await sequelize.query('ALTER TABLE Carts ADD CONSTRAINT carts_one_per_user UNIQUE (user_id)');
    await sequelize.query('ALTER TABLE CartRows DROP COLUMN unit_price_ore');
  },
};
