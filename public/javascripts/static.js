(function($){

	_.templateSettings = {
		  interpolate: /\{\{(.+?)\}\}/g
		};

		Backbone.Model.prototype.idAttribute = '_id';

			var Tweet = Backbone.Model.extend({
				defaults: function(){
					return {
						author : '',
	 					status : ''
					}
				}
			});



			var TweetList = Backbone.Collection.extend({
				model: Tweet,
				url: '/tweets'
			});
			var tweets = new TweetList();

			var TweetView = Backbone.View.extend({
				model: new Tweet(),
				tagName: 'div',
				events:{
					'click .edit' : 'edit',
					'click .delete' : 'delete',
					'blur .status': 'close',
					'keypress .status': 'onEnterUpdate'
				},
				initialize: function(){
					this.template = _.template($("#tweet-template").html());
				},
				edit: function(ev){
					ev.preventDefault();
					this.$('.status').attr('contenteditable',true).focus().addClass('focused');
				},
				close: function(ev){
					var status= this.$('.status').text();
					var self = this;
					this.model.save({status: status},{
						success: function() { console.log("updated successfully tweet"+self.model.id);},
						error: function(){ console.log("failed to update tweet"+self.model.id); }

					});
					this.$('.status').removeAttr('contenteditable').removeClass('focused');
				},
				onEnterUpdate: function(ev){
					if(ev.keyCode === 13){
						this.close();
						_.delay(function(){
							self.$('.status').blur()
						},100);
					}
				},
				delete: function(ev){
					ev.preventDefault();
					var self = this;
					this.model.destroy({
						success: function(){ tweets.remove(self.model); },
						error: function(){ console.log('Failed to delete or remove with id '+self.model.id); }
					});
				},
				render: function(){
					this.$el.html(this.template(this.model.toJSON()));
					return this;
				}
			});

			var TweetsView = Backbone.View.extend({
				model: tweets,
				el: $("#tweets-container"),
				initialize: function(){
					var self = this;
					this.model.on('add',this.render,this);
					this.model.on('remove',this.render,this);
					
					tweets.fetch({
						success:function(){
							self.render();
						},
						error:function(){
							console.log('Cannot retrive data from server!!');
						}


					});

				},
				render: function(){
					var self = this;
					self.$el.html('');
					_.each(this.model.toArray(),function(tweet,i){
						self.$el.append((new TweetView({model: tweet})).render().$el);
					});
					return this;
				}


			});
 
			$(document).ready(function(){
				$("#new-tweet").submit(function(ev){
					ev.preventDefault();
					var tweet = new Tweet({author: $("#author-name").val(),status: $("#status-update").val()});
					tweets.add(tweet);
					//console.log(tweet.toJSON());

					tweet.save({},{
						success:function(){ console.log('successfully created'); },
						error:function(){ console.log('not crated'); }

					});

					return false;
				});
				var appView = new TweetsView();
			});
			

		})(jQuery);