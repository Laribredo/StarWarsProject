var express   = require('express');
var router    = express.Router();
var model     = require('./../model/tasks')( ); 
var request   = require('request');


/* GET PÁGINA PRINCIPAL */
router.get('/', function( req, res, next ) {
  model.find(null, function(err, tasks){
  	if( err )
  	{
 		throw err;
  	}
  	res.render('index', { title: 'Star Wars Planets Api', tasks: tasks });
  })
});

/* POST Adicionando Planetas */
router.post('/add',function( req, res, next ){
	var body = req.body;
	body.status = false;
	var ok = true;

	/*Verifica se existe nome do planeta como o mesmo nome no Banco de Dados*/
	model.find( { NomePlaneta : body.NomePlaneta } ,function(err, tasks){
		if(err)
		{
			throw err;
		}
		if(tasks.length != 0)
		{
			ok = false;
			res.status(401).send({ "erro":
			"Planeta já Existe no Banco de Dados!"});
		}else /*Se não efetua a inclusão no Banco*/
		{		
			var Filmes;
			/*Faz o Request para obter os planetas da API*/
			request('https://swapi.co/api/planets/?format=json',
				function (error, response, body) 
				{				
					Filmes = require('./../model/qtdFilmes')(body, req.body.NomePlaneta);
					do
					{
						console.log("Esperando a Requisições completa da API");
					}while(Filmes == undefined);

				    var insert = { "NomePlaneta":req.body.NomePlaneta, 
								    "ClimaPlaneta": req.body.ClimaPlaneta, 
								    "TerrenoPlaneta": req.body.TerrenoPlaneta, 				  
								    "Filmes" : Filmes}

					model.create(insert, function(err, tasks)
					{
						if(err)
						{
							throw err;
						}
						res.redirect("/");
					});
				}
			);
		}
	});
				
});

/* Lista todos os Planetas*/
router.get('/planetas',function ( req, res, next ) {		
	model.find(function(err, tasks){
		if(err)
		{
			throw err;
		}
		res.send(tasks);
	})
});

/*Procura Planeta por nome*/
router.get('/planetas/nome/:NomePlaneta',function ( req, res, next ) 
{		
	var NomePlaneta = req.params.NomePlaneta;
	model.find( { NomePlaneta : NomePlaneta }, 
	function(err, tasks)
	{
		if(err)
		{
			throw err;
		}
		res.send(tasks);
	})
});

/* Procura planeta por ID*/
router.get('/planetas/id/:id',function ( req, res, next ) 
{		
	var idPlaneta = req.params.id;
	model.findById( idPlaneta,function(err, tasks)
	{
		if(err)
		{
			throw err;
		}
		res.send(tasks);
	})
});

/*Deleta Planetas*/
router.post('/del', function (req, res, next )
{
	var body = req.body;
	if(body.Planeta == "TODOS")
	{
		model.collection.remove({ }, function(err, tasks)
		{
			if(err)
			{
				throw err;
			}
			res.redirect("/");
		});
	}else
	{
		model.collection.remove( { NomePlaneta : body.Planeta }, function(err, tasks)
		{
			if(err)
			{
				throw err;
			}
			res.redirect("/");
		});
	}
});

module.exports = router;
