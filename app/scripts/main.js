"use strict";

//////////////////////////////////////////////////////////
//////////////////////////////////////////MODEL://///////

var Photo = Backbone.Model.extend({

	defaults: {
    	url: '',
	},

	idAttribute: '_id',


});

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////END OF MODEL//////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////COLLECTION://///////////////////////////////
//collection can fetch things at once and run them automatically from the server.

var PhotoCollection1 = Backbone.Collection.extend({
	model: Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos',

});

var PhotoCollection2 = Backbone.Collection.extend({
	model: Photo,	
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos',

});

var PhotoCollection3 = Backbone.Collection.extend({
	model: Photo,	
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos',

});


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////END OF COLLECTION

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////View/////////////////////////////////////////

var PhotoViewOne = Backbone.View.extend({
	
	tagName: "nav",

	template: _.template($('.column-one-template').text()),
	

//column1
	events: {
	    "click .edit-photo": "editPhoto",
	    "click .remove-photo": "deletePhoto",
	    "click .store-photo": "savePhoto",
	    "click .move-center": "movePhoto",
	    "click .add-photo":   "addPhoto"
	   
  	},

  	initialize: function(){
  		this.listenTo(this.model, 'add', this.render),
  		$('.collection1').append(this.el);
  		this.render();
  	},

  	render: function(){
  		if (this.model.attributes.hasOwnProperty('url')){
    	var renderedtemplate = this.template(this.model.attributes)
    	this.$el.html(renderedtemplate);
  		}
  	},

  	editPhoto: function() {
    	var renderTemplate = this.template(this.model.attributes)
    	this.$el.html(renderTemplate);
  
  	},
	/*var addPhoto = new PhotoCollection1,

  		addPhoto.add(this.$el.get({model: 'url'}))
		$('.collection1').append(this.el)
	},*/

 
  	deletePhoto: function() {
	    this.model.destroy();
	    this.remove();
  	
  	},

	savePhoto: function(){

	var fieldvalue = this.$el.find('.field input').val();
	  	console.log(fieldvalue);
	  
	  
	  	this.model.set('Photo', fieldvalue);
	 
	  	this.model.save()
	
	},
});

	




	






var PhotoViewTwo = Backbone.View.extend({
  twoTemplate: _.template($('.column-two-template').text()),

  tagName: "nav",
  	
  	events: {
	    "click .edit-photo": "editPhoto",
	    "click .remove-photo": "deletePhoto",
	    "click .move-center": "movePhoto",
	   
  	},

  	initialize: function(){
  		this.listenTo(this.model, 'change', this.render),
  		$('.collection2').append(this.el);
  		this.render();
  	},

  	render: function(){
  		if (this.model.attributes.hasOwnProperty('url')){
    	var renderedtwoTemplate = this.twoTemplate(this.model.attributes)
    	this.$el.html(renderedtwoTemplate);
  		}
  	},

  	deletePhoto: function() {
	    this.model.destroy();
	    this.remove();
  	
  	},
});

var PhotoViewThree = Backbone.View.extend({
  threeTemplate: _.template($('.column-three-template').text()),
  	
  	tagName: "nav",

  	events: {
	    "click .edit-photo": "editPhoto",
	    "click .remove-photo": "deletePhoto",
	    "click .move-back": "movePhoto3",
	   
  	},

  	initialize: function(){
  		this.listenTo(this.model, 'change', this.render),
  		$('.collection3').append(this.el);
  		this.render();
  	},

  	render: function(){
  		if (this.model.attributes.hasOwnProperty('url')){
    	var renderedthreeTemplate = this.threeTemplate(this.model.attributes)
    	this.$el.html(renderedthreeTemplate);
  		}
  	},

  	deletePhoto: function() {
	    this.model.destroy();
	    this.remove();
  	
  	},

  	savePhoto: function(){

	    var fieldvalue = this.$el.find('.field input').val();
	  	console.log(fieldvalue);
	  
	  
	  	this.model.set('Photo', fieldvalue);
	 
	  	this.model.save()
	
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

var Router = new AppRouter;
Backbone.history.start();






///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Router////////////////////////////









	


 
 

  


	











