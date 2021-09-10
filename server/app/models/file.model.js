module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING
        },
        name: {
        type: Sequelize.STRING
        },
        data: {
        type: Sequelize.BLOB
        }
      /*
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileSize: {
        type: Sequelize.BLOB
      },
      type: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      downloads: {
        type: Sequelize.INTEGER
      },
      */
    });
  
    return File;
  };