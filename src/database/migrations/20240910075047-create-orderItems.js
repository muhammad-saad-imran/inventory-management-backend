'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Run the migration (up method).
   * This creates the 'orderItems' table with the specified columns.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderItems', {
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'orders', // Table name
          key: 'id',       // Reference column in orders table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      inventoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'inventory', // Table name
          key: 'id',          // Reference column in inventory table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
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
   * This drops the 'orderItems' table.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orderItems');
  },
};
