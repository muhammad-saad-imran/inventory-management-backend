'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Run the migration (up method).
   * This creates the 'orders' table with the specified columns.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers', // Table name
          key: 'id',          // Reference column in customers table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
   * This drops the 'orders' table.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
