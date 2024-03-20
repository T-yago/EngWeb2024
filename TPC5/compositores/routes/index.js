var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.render('index', { titulo: 'Gestão de Compositores', data: d });
});

router.get('/compositores', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get('http://localhost:3000/compositores')
    .then( resposta => {
        res.render('listaCompositores', { lista: resposta.data, data: d, titulo: 'Lista de Compositores' });
    })
    .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao recuperar os compositores.'})
    })
});

router.get('/compositores/registo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    res.render('registocompositor', { data: d, titulo: 'Registo de compositor' });
});

router.get('/compositores/:id', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
        res.render('compositor', { compositor: resposta.data, data: d, titulo: 'Consulta de Compositor' });
    })
    .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
    })
});

router.post('/compositores/registo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(JSON.stringify(req.body))
    axios.post("http://localhost:3000/compositores", req.body)
    .then( resposta => {
        res.render('confirmRegisto', { info: req.body, data: d, titulo: 'Registo de compositor com Sucesso' });
    })
    .catch( erro => {
        res.render('error', {error: erro, message: 'Erro ao gravar um compositor novo.'})
    })
});


// GET /compositores/edit/:id
router.get('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos')
  .then( periodos => {
    axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( compositor => {
      res.render('editCompositores', { compositor: compositor.data, periodos: periodos.data, data: d, titulo: "Editar Compositor" })
    })
    .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar o compositor.'})
    })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar os períodos.'})
  })
});


// POST /compositores/edit/:id
router.post('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.params.id)
  .then( compositor_antes => {
    compositor_antes.data.nome = req.body.nome
    compositor_antes.data.periodo = req.body.periodo
    axios.put("http://localhost:3000/compositores/" + req.params.id, compositor_antes.data)
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
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(compositor => {
      axios.delete('http://localhost:3000/compositores/' + req.params.id)
        .then(resposta => {
          res.json({ compositor: compositor.data, data: d, titulo: "Compositor Apagado" });
        })
        .catch(erro => {
          res.status(500).json({ error: erro, message: 'Erro ao apagar o compositor.' });
        });
    })
    .catch(erro => {
      res.status(500).json({ error: erro, message: 'Erro ao recuperar o compositor.' });
    });
});



/////////




router.get('/periodos', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos')
  .then( resposta => {
      res.render('listaperiodos', { lista: resposta.data, data: d, titulo: 'Lista de periodos' });
  })
  .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar os periodos.'})
  })
});

router.get('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoperiodo', { data: d, titulo: 'Registo de periodo' });
});

router.get('/periodos/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
  .then( resposta => {
      res.render('periodo', { compositor: resposta.data, data: d, titulo: 'Consulta de Período' });
  })
  .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
  })
});

// periodos/delete/:id
router.get('/periodos/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(periodo => {
      axios.delete('http://localhost:3000/periodos/' + req.params.id)
        .then(resposta => {
          res.json({ periodo: periodo.data, data: d, titulo: "Período Apagado" });
        })
        .catch(erro => {
          res.status(500).json({ error: erro, message: 'Erro ao apagar o período.' });
        });
    })
    .catch(erro => {
      res.status(500).json({ error: erro, message: 'Erro ao recuperar o período.' });
  })
});

router.post('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  console.log(JSON.stringify(req.body))
  axios.post("http://localhost:3000/periodos", req.body)
  .then( resposta => {
      res.render('confirmRegisto', { info: req.body, data: d, titulo: 'Registo de periodo com Sucesso' });
  })
  .catch( erro => {
      res.render('error', {error: erro, message: 'Erro ao gravar um periodo novo.'})
  })
});

// GET /periodos/edit/:id
router.get('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
  .then( periodo => {
    res.render('editPeriodos', { periodo: periodo.data, data: d, titulo: "Editar Período" })
  })
  .catch( erro => {
    res.render('error', {error: erro, message: 'Erro ao recuperar o período.'})
  })
});


// POST /periodos/edit/:id
router.post('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos/" + req.params.id)
  .then( periodo_antes => {
    periodo_antes.data.nome = req.body.nome
    axios.get('http://localhost:3000/compositores?periodo=' + req.params.id)
    .then( compositores => {
      axios.put("http://localhost:3000/periodos/" + req.params.id, periodo_antes.data)
      .then ( periodo => {
        res.render('periodo', { data: d, periodo: periodo.data, compositores: compositores.data, titulo: "Período " + periodo.data.id });
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
