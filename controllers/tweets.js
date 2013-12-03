var _ = require('underscore'),
	tweets = require('../db').collections.tweets,
	ObjectId = require('../db').ObjectId;


exports.index = function(req,res){
	tweets.find().toArray(function(err,docs){
		if(err) return res.status(500).send({status: 'Falied to find tweets'});
		res.send(docs);
	});	
};

exports.show = function(req,res){
	
};
exports.create = function(req,res){
	var params = req.body;
	tweets.insert(params,function(err){
		if(err) return res.status(500).send({status: 'Falied to create to the mongodb tweets collections'});
		res.send(params);
	});
};
exports.destroy = function(req,res){
	var id = req.params.id;
	tweets.remove({_id: new ObjectId(id)},function(err,num){
		if(err || num != 1) return res.status(500).send({status: 'Falied to remove delete '+ id +'from the mongodb tweets collections'});

		res.send({_id:id});

	});
};
exports.update = function(req,res){
	var id = req.params.id,
	param = req.body;

	tweets.update({_id: new ObjectId(id)},sanitize(param),function(err,numr){
		if(err || numr != 1) return res.status(500).send({status: 'Falied to update '+ id +'from the mongodb tweets collections'});		
	});
};

function sanitize(tweet){
	var tweet = _.clone(tweet);
	delete tweet._id;
	return tweet;
}