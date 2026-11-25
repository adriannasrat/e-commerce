// Failed sign-ins, kept for a short window so repeated guessing can be slowed
// down. Only digests of the email address and the network address are stored.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(`CREATE TABLE SignInFailures (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email_hash CHAR(64) NOT NULL,
      address_hash CHAR(64) NOT NULL,
      createdAt DATETIME NOT NULL,
      INDEX sign_in_failures_pair (email_hash, address_hash, createdAt),
      INDEX sign_in_failures_address (address_hash, createdAt),
      INDEX sign_in_failures_age (createdAt)
    )`);
  },
};
