var home = require('./controllers/home');
var tweets = require('./controllers/tweets');
module.exports = function(app){
	app.get('/', home.index);


	//Tweets crud functions

	app.get('/tweets', tweets.index);
	app.post('/tweets', tweets.create);
	app.get('/tweets/:id', tweets.show);
	app.put('/tweets/:id', tweets.update);
	app.delete('/tweets/:id', tweets.destroy);



};