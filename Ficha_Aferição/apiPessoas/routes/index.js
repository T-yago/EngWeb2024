var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')
var Desporto = require('../controllers/desporto')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { titulo: 'GestÃ£o de Compositores', data: d });
});

/* GET pessoas */
router.get('/pessoas', function(req, res) {
  Pessoa.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

/* GET Pessoa  */
router.get('/pessoas/:id', function(req, res) {
  Pessoa.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

router.post('/pessoas', function(req, res) {
  console.log("Received POST request to /pessoas");
  console.log("Request body:", req.body);
  
  Pessoa.insert(req.body)
    .then(data => {
      console.log("Data inserted successfully:", data);
      res.status(201).jsonp(data);
    })
    .catch(erro => {
      console.error("Error inserting data:", erro);
      res.status(523).jsonp(erro);
    });
});


router.put('/pessoas/:id', function(req, res) {
  Pessoa.updatePessoa(req.params.id, req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(524).jsonp(erro))
});

//get desporto
router.get('/desportos', function(req, res) {
  Desporto.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

//get desporto by id
router.get('/desportos/:id', function(req, res) {
  Desporto.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

// post desporto
router.post('/desportos', function(req, res) {
  console.log("Received request body:", req.body);

  Desporto.insert(req.body)
    .then(dados => {
      console.log("Data inserted successfully:", dados);
      res.status(201).jsonp(dados);
    })
    .catch(erro => {
      console.error("Error inserting data:", erro);
      res.status(500).jsonp({ error: "Internal server error" });
    });
});

//put desporto
router.put('/desportos/:id', function(req, res) {
  Desporto.updateDesporto(req.params.id, req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(524).jsonp(erro))
});



module.exports = router;
