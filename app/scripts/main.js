"use strict";

//////////////////////////////////////////////////////////
//////////////////////////////////////////MODEL://///////
//MODEL:
//How data should look and behave.
//extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and subclassed as far as you like.


var Photo = Backbone.Model.extend({
//specify the default attributes for model.
	defaults: {
    	url: '',
	},
//tells backbone that mongo(database) is calling the id something else.
	idAttribute: '_id',


});



//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////COLLECTION://///////////////////////////////
//collection can fetch things at once and run them automatically from the server.
//The Collection will take every object literal and try to run them through the constructor
var PhotoCollection1 = Backbone.Collection.extend({
//In reference to Model	
	model: Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos',

});

var PhotoCollection2 = Backbone.Collection.extend({
	model: Photo,	
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos2',

});

var PhotoCollection3 = Backbone.Collection.extend({
	model: Photo,	
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos3',

});


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////View/////////////////////////////////////////
//VIEW:
//Forces settings into model.Takes the same data in model and makes changes.
var PhotoViewOne = Backbone.View.extend({
	
	tagName: "nav",

	template: _.template($('.column-one-template').text()),
	

///////////////////////////////////////column1////////////////////////////////////////////
//events gives objects the ability to bind and trigger custom named events.
//The callback will be invoked whenever the event is fired.
//click.class for updates and changes
	events: {
	    "click .remove-photo": "deletePhoto",
	    "click .store-photo": "savePhoto",
	    "click .move-center": "movePhoto",
	    "click .add-photo":   "addPhoto"
	   
  	},
//Listento tells an object to listen to a particular event on another object. 
//When the model is created, the initialized function will be invoked.
//Refreshes when there is a change in the model. Renders if there is a change to the container.
  	initialize: function(){
  		//append everything within the view
  		this.listenTo(this.model, 'change', this.render),
  		$('.collection1').append(this.el);
  		//this renders immediately w/o listing to when called.
  		this.render()
  	},

  	render: function(){
  		var renderedtemplate = this.template(this.model.attributes)
    	this.$el.html(renderedtemplate);
  		
  	},
	
	addPhoto: function(){


	},
	
	movePhoto: function(){
    	$.post('http://tiny-pizza-server.herokuapp.com/collections/photos2', {
        url: this.model.attributes.url,
    });
    	this.model.destroy().done(function(){
      	$('.collection2').html('');
      	$('.collection2').append('');
      	var app = new AppRouter;

    })
  },

	savePhoto: function(){
//find:class
	var fieldvalue = this.$el.find('.field input').val();
	  	console.log(fieldvalue);
	  
	  //setting the new propety value of model locally
	  	this.model.set('Photo', fieldvalue);
	 //saves the model
	  	this.model.save()
	
	},
});

////////////////////Column2////////////////////////////////////////////////////
var PhotoViewTwo = Backbone.View.extend({

  twoTemplate: _.template($('.column-two-template').text()),

  tagName: "nav",
  	
  	events: {
	    "click .remove-photo": "deletePhoto",
	    "click .move-right": "moveRight",
	   
  	},

  	initialize: function(){
  		this.listenTo(this.model, 'change', this.render),
  		$('.collection2').append(this.el);
  		this.render();
  		
  	},

  	render: function(){
    	var renderedtwoTemplate = this.twoTemplate(this.model.attributes)
    	this.$el.html(renderedtwoTemplate);
  		
  	},

  	moveRight: function(){
    	$.post('http://tiny-pizza-server.herokuapp.com/collections/photos3', {
        url: this.model.attributes.url,
    });
    	this.model.destroy().done(function(){
      	$('.collection3').html('');
      	$('.collection3').append('');
      	var app = new AppRouter;

    })
},

});

//////////////////third Column/////////////////////////////////////////////

var PhotoViewThree = Backbone.View.extend({

  threeTemplate: _.template($('.column-three-template').text()),
  	
  	tagName: "nav",

  	events: {
	    "click .remove-photo": "deletePhoto",
	    "click .move-back": "movePhoto3",
	   
  	},

  	initialize: function(){
  		this.listenTo(this.model, 'destroy', this.render),
  		$('.collection3').append(this.el);
  		this.render();
  	},

  	render: function(){
    	var renderedthreeTemplate = this.threeTemplate(this.model.attributes)
    	this.$el.html(renderedthreeTemplate);
  		
  	},

  	movePhoto3: function(){
    	$.post('http://tiny-pizza-server.herokuapp.com/collections/photos2', {
        url: this.model.attributes.url,
    });
    	
    	this.model.destroy().done(function(){
      	$('.collection3').html('');
      	$('.collection3').append('');
      	var app = new AppRouter;
      
  	
  		})
  	
	},

});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Router////////////////////////////////

var leftPhoto = new PhotoCollection1();
var centerPhoto = new PhotoCollection2();
var rightPhoto 	= new PhotoCollection3();

var AppRouter = Backbone.Router.extend({
	
 	initialize: function(){
 		console.log ('router initialized');

		leftPhoto.fetch().done(function() {
			leftPhoto.each(function (photo) {
				new PhotoViewOne({ model: photo });
			})
		});
	
		centerPhoto.fetch().done(function() {
			centerPhoto.each(function (photo) {
				new PhotoViewTwo({ model: photo });
			})
		});
	

		rightPhoto.fetch().done(function() {
			rightPhoto.each(function (photo) {
				new PhotoViewThree({ model: photo });
			})
		});
	},	
})



var addPhoto = new PhotoCollection1;
var addPhoto = new PhotoCollection2;
var addPhoto = new PhotoCollection3;	

var Router = new AppRouter;
Backbone.history.start();
















	


 
 

  


	











