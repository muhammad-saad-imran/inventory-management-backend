'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Run the migration (up method).
   * This creates the 'inventory' table with the specified columns.
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      supplierId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'supplier', // Table name
          key: 'id',         // Reference column name in Supplier table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'product',  // Table name
          key: 'id',         // Reference column name in Product table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cost: {
        type: Sequelize.FLOAT, // `NUMERIC` should be FLOAT or DECIMAL in Sequelize
        allowNull: false,
      },
      supplyDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      stock: {
        type: Sequelize.INTEGER,
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
   * This drops the 'inventory' table.
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventory');
  },
};
