var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          
var static = require('./static.js')            

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == '/compositores') {
                    axios.get('http://localhost:3000/compositores')
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.compositoresListPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                })}

                // GET /alunos/:id --------------------------------------------------------------------
                else if (/\/compositores\/C\d+/.test(req.url)) {
                    axios.get('http://localhost:3000' + req.url)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.compositorPage(resposta.data, d))
                    })
                .catch( erro => {
                    res.writeHead(520, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(erro, d))
                })}

                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo') {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositoresFormPage(d))
                }
               
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.CompositorFormEditPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                })}

                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                    })
                    .catch ( erro => {
                        res.writeHead(521, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                    })

                // GET /periodos --------------------------------------------------------------------
                } else if (req.url == '/periodos') {
                    axios.get('http://localhost:3000/periodos')
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.periodosListPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                    });
                // GET /periodos/:id --------------------------------------------------------------------
                } else if (/\/periodos\/P\d+/.test(req.url)) {
                    axios.get('http://localhost:3000' + req.url)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.periodosPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                    });
                // GET /periodos/registo --------------------------------------------------------------------
                } else if (req.url == '/periodos/registo') {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodosFormPage(d))
                // GET /periodos/edit/:id --------------------------------------------------------------------
                } else if (/\/periodos\/edit\/P\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + idPeriodo)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.periodosFormEditPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                    });
                // GET /periodos/delete/:id --------------------------------------------------------------------
                } else if (/\/periodos\/delete\/P\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/periodos/' + idPeriodo)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                    })
                    .catch ( erro => {
                        res.writeHead(521, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro, d))
                    });
                }

                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido GET não suportado: ${req.url}`, d))
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == '/compositores/registo') {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores", result)
                            .then( resposta => {
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.compositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(502, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/compositores/" + idCompositor, result)
                            .then( resposta => {
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.compositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(502, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                } else if (req.url == 'periodos/registo') {
                collectRequestBodyData(req, result => {
                    if (result) {
                        axios.post("http://localhost:3000/periodos", result)
                        .then( resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodosPage(resposta.data, d))
                        })
                        .catch( erro => {
                            res.writeHead(502, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                    }
                    else {
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                })} else if (/\/periodos\/edit\/P\d+/.test(req.url)) {
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + idPeriodo, result)
                            .then( resposta => {
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.periodosPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(502, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                // POST ? -> Lancar um erro
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido POST não suportado: ${req.url}`, d))
                }
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



