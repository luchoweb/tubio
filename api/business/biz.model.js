const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        background: { type: DataTypes.STRING, allowNull: false },
        text_color: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        city: { type: DataTypes.STRING, allowNull: true },
        country: { type: DataTypes.STRING, allowNull: false },
        verified: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {};

    return sequelize.define('Business', attributes, options);
}