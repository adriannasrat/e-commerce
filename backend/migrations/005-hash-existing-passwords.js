const { QueryTypes } = require('sequelize');
const { hashPassword, isHashed } = require('../auth/password');

module.exports = {
  up: async ({ context: sequelize }) => {
    const users = await sequelize.query('SELECT id, password FROM Users', { type: QueryTypes.SELECT });
    for (const { id, password } of users) {
      if (isHashed(password)) continue;
      await sequelize.query('UPDATE Users SET password = ? WHERE id = ?', {
        replacements: [await hashPassword(password), id],
      });
    }
  },
};
