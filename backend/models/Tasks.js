module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define("Tasks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        progress: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN, // changed to BOOLEAN data type
            allowNull: false,
            defaultValue: false // default value set to false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true, // allow null values
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true, // allow null values
        },
        remainder: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    });

    Tasks.associate = function(models) {
        Tasks.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Tasks;
};
