var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')
var Periodo = require('../controllers/periodo');

/* GET home page. */
router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.render('index', { titulo: 'Gestão de Compositores', data: d });
});

router.get('/compositores', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Compositor.list()
      .then(compositores => {
          console.log(compositores); // Log retrieved data
          res.render('listaCompositores', { lista: compositores, data: d, titulo: 'Lista de Compositores' });
      })
      .catch(erro => {
          res.render('error', { error: erro, message: 'Erro ao recuperar os compositores.' });
      });
});

// GET /compositores/registo
router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Periodo.list()
  .then( periodos => {
    res.render('registoCompositor', { periodos: periodos, data: d, titulo: 'Registo de Compositor' });
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});

router.get('/compositores/:id', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Compositor.findById(req.params.id)
    .then( compositor => {
        res.render('compositor', { compositor: compositor, data: d, titulo: 'Consulta de Compositor' });
    })
    .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
    })
});

router.post('/compositores/registo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Compositor.insert(req.body)
    .then( compositor => {
      res.render('compositor', { data: d, compositor: compositor, titulo: "Compositor " + compositor.id });
    })
    .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao gravar um compositor novo.'})
    })
});


// GET /compositores/edit/:id
router.get('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Compositor.findById(req.params.id)
    .then( compositor => {
      res.render('editCompositores', { compositor: compositor, data: d, titulo: "Editar Compositor" })
    })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});


// POST /compositores/edit/:id
router.post('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Compositor.findById(req.params.id)
  .then( compositor_antes => {
    compositor_antes.data.nome = req.body.nome
    compositor_antes.data.periodo = req.body.periodo
    .then ( compositor => {
      res.render('compositor', { data: d, compositor: compositor.data, titulo: "Compositor " + compositor.data.id });
    })
    .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao atualizar o compositor.'})
    })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
  }
  )
});

// GET /compositores/delete/:id
router.get('/compositores/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Compositor.findById(req.params.id)
  .then( compositor => {
    Compositor.deleteById(req.params.id)
    res.render('deleteCompositor', { compositor: compositor, data: d, titulo: "Compositor Apagado" })
    })
    .catch(erro => {
      res.status(500).json({ error: erro, message: 'Erro ao recuperar o compositor.' });
    });
});



/////////




router.get('/periodos', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Periodo.list()
  .then( periodos => {
    res.render('listaPeriodos', { periodos: periodos, data: d, titulo: 'Lista de Períodos' });
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});

router.get('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoperiodo', { data: d, titulo: 'Registo de periodo' });
});

router.get('/periodos/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  
  // Find the Periodo by ID
  Periodo.findById(req.params.id)
    .then(periodo => {
      // Find Compositores by Periodo ID
      return Compositor.findByPeriodo(periodo.id)
        .then(compositores => {
          // Render the view only after both promises are resolved
          res.render('periodo', { data: d, periodo: periodo, compositores: compositores, titulo: "Período " + periodo.id });
        })
        .catch(erro => {
          res.render('error', {error: erro, message: 'Erro ao recuperar os compositores do período.'})
        });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
    });
});



// periodos/delete/:id
router.get('/periodos/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Periodo.findById(req.params.id)
    .then(periodo => {
      Periodo.deleteById(req.params.id)
      res.render('deletePeriodo', { periodo: periodo, data: d, titulo: "Período Apagado" });
    })
    .catch(erro => {
      res.status(500).json({ error: erro, message: 'Erro ao recuperar o período.' });
  })
});

router.post('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Periodo.list()
  .then( periodos => {
      var id = 0
      for(let i=0; i < periodos.length ; i++) {
        if (periodos[i].id > id) {
            id = periodos[i].id
        }
      }
      req.body._id = (parseInt(id) + 1) + "";
      req.body.compositores = [];
      Periodo.insert(req.body)
      .then( periodo => {
        res.render('periodo', { data: d, periodo: req.body, compositores: [], titulo: "Período " + req.body.id });
      })
      .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao inserir o registo do novo período.'})
      })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});

// GET /periodos/edit/:id
router.get('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Periodo.findById(req.params.id)
  .then( periodo => {
    res.render('editPeriodos', { periodo: periodo, data: d, titulo: "Editar Período" })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
  })
});

router.post('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  Periodo.findById(req.params.id)
  .then( periodo_antes => {
    periodo_antes.nome = req.body.nome
    .then( compositores => {
      Periodo.updatePeriodoById(req.params.id, periodo_antes)
      .then ( periodo => {
        res.render('periodo', { data: d, periodo: periodo_antes, compositores: compositores, titulo: "Período " + periodo_antes.id });
      })
      .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao atualizar o período.'})
      })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os compositores.'})
    })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
  })
});





module.exports = router;




module.exports = router;
