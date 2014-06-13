"use strict";

//////////////////////////////////////////////////////////
//////////////////////////////////////////MODEL://///////
//MODEL:
//How data should look and behave.
//extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and subclassed as far as you like.


var Photo = Backbone.Model.extend({
//specify the default attributes for model.
	idAttribute: "_id",

	defaults: {
    	url: '',
	},
});

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////COLLECTION://///////////////////////////////
//collection can fetch things at once and run them automatically from the server.
//The Collection will take every object literal and try to run them through the constructor
var PhotoCollection = Backbone.Collection.extend({
//In reference to Model	
	model: Photo,
	
	initialize: function(options) {
		this.url = options.url;

		this.id = _.uniqueId('collection-');
		this.on('add',function(photo){
			new PhotoView({
				model:photo,
				container:$('.' + this.id)
			});
		})
	}
})


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////View/////////////////////////////////////////
//VIEW:
//Forces settings into model.Takes the same data in model and makes changes.
var PhotoView = Backbone.View.extend({
	
	tagName: "nav",

	template: _.template($('.column-one-template').text()),
	

///////////////////////////////////////column1////////////////////////////////////////////
//events gives objects the ability to bind and trigger custom named events.
//The callback will be invoked whenever the event is fired.
//click.class for updates and changes
	events: {
	    "click .remove-photo": 		"deletePhoto",
	    "click .move-right-once": 	"movePhoto",
	    "click .move-right-twice": 	"movePhoto2",
	},
//Listento tells an object to listen to a particular event on another object. 
//When the model is created, the initialized function will be invoked.
//Refreshes when there is a change in the model. Renders if there is a change to the container.
  	

	initialize: function(options){

		this.container = options.container

		this.listenTo(this.model,'destroy',this.remove);
		this.listenTo(this.model,'change',this.render);

		this.container.append(this.el);
		this.render();
	},

	render: function(){
  		var renderedtemplate = this.template(this.model.attributes)
    	this.$el.html(renderedtemplate);
    	return this;
  		
  	},

  	deletePhoto: function(){

  		this.model.destroy();
  	},

//movePhoto: will move once. 
//movePhoto2: will move twice. 
	movePhoto: function(){
	//the index is gettin the index of the collection array. 	
		var index = _.indexOf(collectionArray, this.model.collection);
		console.log('tester', index)
		
		if (index + 1 >= collectionArray.length){
			var newModel= collectionArray[0].add({url: this.model.attributes.url})
			console.log('yes!')
		}else{
			var newModel= collectionArray[index + 1].add({url: this.model.attributes.url})
			console.log('what?')
		}
	
		newModel.save();
		this.model.destroy();
	},

	movePhoto2: function(){
		var index = _.indexOf(collectionArray, this.model.collection);
		console.log('work!', index)

		if (index + 2 >= collectionArray.length){
			collectionArray[1].add({url: this.model.attributes.url})
			console.log('maybe?')
		}else{
			collectionArray[index + 2].add({url: this.model.attributes.url})
			console.log('yay!')
		}

		newModel.save();
		this.model.destroy();
	},
});

var collectionArray = [
	new PhotoCollection({url:'http://tiny-pizza-server.herokuapp.com/collections/photos'}),
	new PhotoCollection({url:'http://tiny-pizza-server.herokuapp.com/collections/photos1'}),
	new PhotoCollection({url:'http://tiny-pizza-server.herokuapp.com/collections/photos2'})
]
 
collectionArray.forEach(function (images){
	var newDiv = $('<div></div>')
	newDiv.addClass(images.id + ' container');
	$('.image-container').append(newDiv);

	images.fetch();

	
})





















	


 
 

  


	











