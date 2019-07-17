module.exports = function ( body, paramn ) 
{
	var achou = false;
	var request = require('request'); 
	/*
	* TRATA O JSON PARA OBTER A INFORMAÇÃO
	*/
	function trataJson( body, paramn )
	{
		var filmes;
		var planetas = JSON.parse(body);
		for (var i = 0; i < planetas.results.length; i++)
		{
			if(planetas.results[i].name == paramn)
			{
				achou = true;
				if( planetas.results[i].films.length == 0 )
				{
 					filmes = 0;
				}else
				{
					filmes = planetas.results[i].films.length;
				}
				break;
			}
			/*Se não achar JSON na pagina faz a requisição para a proxima*/
			if( i == ( planetas.results.length - 1 )  && !achou )
			{
				if(planetas.next != null )
				{
					requestApi(planetas.next);
				}else
				{
					filmes = 0;
				}
			}
		}

		//Se Não possui Filmes Declara como 0 a quantidade
		if(filmes == undefined)
			filmes = 0;

		return filmes;
	}

	function requestApi( url )
	{
		request(url,
			function (error, response, body) 
			{				
				trataJson(body , paramn);
				
			}
		);
	}


	return trataJson( body, paramn );
	

}
