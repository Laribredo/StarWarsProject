module.exports = function ( paramn ) 
{
	var filmes;
	var achou = false;
	
	/*
	* PRIMEIRO REQUEST
	*/
	var request = require('request');
	request('https://swapi.co/api/planets/?format=json', 
		
	function (error, response, body) 
	{
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		trataJson(body, paramn);
	});

	/*
	* TRATA O JSON PARA OBTER A INFORMAÇÃO
	*/
	function trataJson( body, paramn )
	{
		var planetas = JSON.parse(body);
		for (var i = 0; i < planetas.results.length; i++)
		{
			if(planetas.results[i].name == paramn)
			{
				achou = true;
				if( planetas.results[i].films.length == 0 )
				{
 					filmes = ['Planeta Não Participou de filmes da franquia.'];
				}else
				{
					filmes = planetas.results[i].films
				}
				break;
			}
			/*Se não achar JSON na primeira pagina*/
			if( i == ( planetas.results.length - 1 )  && !achou )
			{
				if(planetas.next != null )
				{
					requestApi(planetas.next);
				}else
				{
					filmes = ['Planeta Não Participou de filmes da franquia.'];
				}
				
			}
		}
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

}
