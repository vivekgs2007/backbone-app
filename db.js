var Mongolian = require("mongolian"),
	ObjectId = Mongolian.ObjectId;

ObjectId.prototype.toJSON = function toJSON() {
	return this.toString();
};

var server = new Mongolian();

var db = server.db('backbone_app');

module.exports.collections = {
	tweets: db.collection('tweets')
};

module.exports.ObjectId = ObjectId;