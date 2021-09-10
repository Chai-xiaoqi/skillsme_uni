var stream = require('stream');

const db = require("../models");
const File = db.files;

exports.uploadFile = (req, res) => {
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

// Delete a File with the specified id in the request
exports.deleteFile = (req, res) => {
  const id = req.params.id;

  File.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "File was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete File with id=${id}. Maybe File was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete File with id=" + id
      });
    });
};

// Delete all File from the database.
exports.deleteAll = (req, res) => {
  File.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Files were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all files."
      });
    });
};


/*const db = require("../models");
const File = db.files;
const Op = db.Sequelize.Op;

// Create and Save an file
exports.create = (req, res) => {
    // Create a File
    const file = {
     fileName: req.body.fileName,
     fileSize: req.body.fileSize,
     type: req.body.type,
     data: req.body. data,
     downloads: req.body.downloads 
    };
  
    // Save File in the database
    File.create(file)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the File."
        });
      });
  };
// Retrieve all files from the database.
exports.findAll = (req, res) => {
  const fileName = req.query.fileName;
  var condition = fileName ? { fileName: { [Op.like]: `%${fileName}%` } } : null;

  File.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findemail = (req, res) => {
    const email = req.params.email;
    
    File.findOne({ where: { email:email }})
   // check if the file exists in the database
      .then(data => {
        if(data!=null){
          res.send(data);
          res.send({
            message: '1'
          });
        }
        else res.send({
          message:"0"
        })
          
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message ||  "Some error occurred while retrieving tutorials."
        });
      });
  };

//* Find a single File with an id
exports.findid = (req, res) => {
    const id = req.params.id;
  
    File.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving File with id=" + id
        });
      });
  };
// Update a File by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  File.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "File was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update File with id=${id}. Maybe File was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating File with id=" + id
      });
    });
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    File.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "File was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete File with id=${id}. Maybe File was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete File with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    File.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

*/