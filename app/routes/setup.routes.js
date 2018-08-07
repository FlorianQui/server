module.exports = (app) => {
  let setup = require('../controllers/setup.controller.js');

  app.post('/karting/setup', setup.create);

  app.get('/karting/setup', setup.findAll);

  app.get('/karting/setup/:setupId', setup.findOne);

  app.put('/karting/setup/:setupId', setup.update);

  app.delete('/karting/setup/:setupId', setup.delete);
}
