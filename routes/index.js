var express = require('express');
var router = express.Router();
var model  = require('./../model/tasks')( ); 

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
	model.create(body, function(err, tasks){
		if(err)
		{
			throw err;
		}
		res.redirect("/");
	})

});

router.get('/planetas',function ( req, res, next ) {		
	model.find(function(err, tasks){
		if(err)
		{
			throw err;
		}
		res.send(tasks);
	})
});

router.get('/planetas/:NomePlaneta',function ( req, res, next ) 
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

module.exports = router;
