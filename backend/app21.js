const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../backend/ATVS2.db';

const hostname = '127.0.0.1';
const port = 3020;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/Experiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM EXPERIENCIA ORDER BY ID_UDUARIO';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

app.post('/insereExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO EXPERIENCIA (NOME_EMPRESA, INICIO_EMPRESA, FIM_EMPRESA, CARGO, DESCRICAO_CARGO) VALUES ('" + req.body.nomeempresa + "', '" + req.body.inicioempresa + "', '" + req.body.fimempresa + "', '" + req.body.cargo + "', '" + req.body.descricaocargo + "')";
	console.log(sql);

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>EXPERIENCIA INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

app.get('/atualizaExperiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM EXPERIENCIA WHERE ID_UDUARIO="+ req.query.ID_UDUARIO;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "UPDATE EXPERIENCIA SET NOME_EMPRESA='" + req.body.NOME_EMPRESA + "', INICIO_EMPRESA = '" + req.body.INICIO_EMPRESA + "' , FIM_EMPRESA='" + req.body.FIM_EMPRESA + "', CARGO = '" + req.body.CARGO + "', DESCRICAO_CARGO='" + req.body.DESCRICAO_CARGO + "'  WHERE ID_UDUARIO='" + req.body.ID_UDUARIO + "'";
	console.log(sql);
	
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>EXPERIENCIA ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM EXPERIENCIA WHERE ID_UDUARIO='" + req.query.ID_UDUARIO + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>EXPERIENCIA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });