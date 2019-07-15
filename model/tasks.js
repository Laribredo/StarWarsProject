module.exports = function ( ) 
{
	var db = require('./../libs/connect_db')( );
	var Schema = require('mongoose').Schema;

	var Planets = Schema
	({
		NomePlaneta : String,
		ClimaPlaneta : String,
		TerrenoPlaneta : String,
	});	

	return db.model('Planets', Planets);
}