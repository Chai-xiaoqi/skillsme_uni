module.exports = app => {
    const files = require("../controllers/file.controller.js");
    let upload = require('../config/multer.config.js');
 
    var router = require("express").Router();
  
    router.post('/upload', upload.single("file"), files.uploadFile);
 
    router.get('/info', files.listAllFiles);
 
    router.get('/:id', files.downloadFile);

    router.delete("/:id", files.deleteFile);

    router.delete("/", files.deleteAll);


/*
    // Create a new file
    router.post("/", files.create);
    router.get("/", files.findAll);
    // Retrieve a single File with email
    router.get("/:id", files.findid);
    
  
    // Retrieve a single File with id
    //router.get("/:", files.findid);
  
    
    // Update a File with email
    router.put("/:id", files.update);
  
    // Delete a File with email
    router.delete("/:id", files.delete);
  
    // delete all Files
    router.delete("/", files.deleteAll);
  */
    app.use('/skillsme/files', router);
  };
  