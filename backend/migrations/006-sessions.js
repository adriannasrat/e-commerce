module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(`CREATE TABLE Sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
    )`);
  },
};
