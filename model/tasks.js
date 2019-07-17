module.exports = function ( ) 
{
	var db = require('./../libs/connect_db')( );
	var Schema = require('mongoose').Schema;

	var Planets = Schema
	({
		NomePlaneta : String,
		ClimaPlaneta : String,
		TerrenoPlaneta : String,
		Filmes : Number
		//Filmes : [String]
	},{
    	versionKey: false // You should be aware of the outcome after set to false
	});	

	return db.model('Planets', Planets);
}