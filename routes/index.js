const OnSassController = require('../controllers/OnSassController.js');
const configProvider = require('../services/SassConfigProvider');

const express = require('express');

const router = express.Router();

router.get(`/:entity`, (request, response, next) => {
  const controller = new OnSassController(request, response, next);

  if(configProvider.hasEntity(request.params.entity)) {
    configProvider.entity = request.params.entity;
    controller.handleRequest();
  }
  else {
    controller.handleError(404);
  }
});

module.exports = router;
