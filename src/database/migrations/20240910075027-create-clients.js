'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Run the migration (up method).
   * This creates the 'Clients' table with the specified columns.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  /**
   * Reverse the migration (down method).
   * This drops the 'Clients' table.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
  },
};
