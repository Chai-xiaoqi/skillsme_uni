module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
     typeAllowed: {
        type: Sequelize.STRING
      }
    });
  
    return Project;
  };