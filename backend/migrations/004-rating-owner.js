// Every new rating belongs to a user. Ratings from before user_id existed have
// no known author, so the column stays nullable there rather than losing them.
module.exports = {
  up: async ({ context: sequelize }) => {
    const columns = await sequelize.getQueryInterface().describeTable('Ratings');
    if (!columns.user_id) {
      // Two statements, since TiDB cannot add a column and its key at once.
      await sequelize.query('ALTER TABLE Ratings ADD COLUMN user_id INT NULL');
      await sequelize.query(`ALTER TABLE Ratings
        ADD CONSTRAINT ratings_user_fk FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE SET NULL`);
    }
    // A user's latest rating of a product wins.
    await sequelize.query(`DELETE older FROM Ratings older JOIN Ratings newer
      ON older.product_id = newer.product_id AND older.user_id = newer.user_id AND older.id < newer.id`);
    await sequelize.query('UPDATE Ratings SET rating = LEAST(GREATEST(rating, 1), 5)');
    // One constraint per statement, which TiDB requires for CHECK.
    await sequelize.query('ALTER TABLE Ratings ADD CONSTRAINT ratings_value_range CHECK (rating BETWEEN 1 AND 5)');
    await sequelize.query('ALTER TABLE Ratings ADD CONSTRAINT ratings_product_user_unique UNIQUE (product_id, user_id)');
  },
};
