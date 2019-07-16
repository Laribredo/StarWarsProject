var express   = require('express');
var router    = express.Router();
var model     = require('./../model/tasks')( ); 

/* GET home page. */
router.get('/', function( req, res, next ) {
  model.find(null, function(err, tasks){
  	if( err )
  	{
 		throw err;
  	}
  	res.render('index', { title: 'Express', tasks: tasks });
  })
});

/* POST planets ADD */
router.post('/add',function( req, res, next ){
	var body = req.body;
	body.status = false;
	var Filmes = require('./../model/qtdFilmes')(body.NomePlaneta);
	console.log(Filmes);

	var insert = {"NomePlaneta":body.NomePlaneta, "ClimaPlaneta": body.ClimaPlaneta, "TerrenoPlaneta": body.TerrenoPlaneta, "Filmes" : Filmes};
	model.create(insert, function(err, tasks){
		if(err)
		{
			throw err;
		}
		res.redirect("/");
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
