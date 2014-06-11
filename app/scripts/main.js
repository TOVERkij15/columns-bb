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
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos2',

});

var PhotoCollection3 = Backbone.Collection.extend({
	model: Photo,	
  	url: 'http://tiny-pizza-server.herokuapp.com/collections/photos3',

});


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////END OF COLLECTION

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////View/////////////////////////////////////////

var PhotoView = Backbone.View.extend({

	template: _.template($('.column-one-template').text()),
	twoTemplate: _.template($('.column-two-template').text()),
	threeTemplate: _.template($('.column-three-template').text()),


	events: {
	    "click .edit-photo": "editPhoto",
	    "click .remove-photo": "deletePhoto",
	    "click .store-photo": "savePhoto",
	   
  	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render),
		$('.collection1').append(this.el)
		this.render();
	},


	render: function() {
    	var renderedtemplate = this.template(this.model.attributes)
    	this.$el.html(renderedtemplate)

  	},

  	editPhoto: function() {
    	var renderedtemplate = this.template(this.model.attributes)
    	this.$el.html(renderedtemplate)
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
				
				new PhotoView({ model: photo });
			})
		});
	
		centerPhoto.fetch().done(function() {
			centerPhoto.each(function (photo) {
				new PhotoView({ model: photo });
			})
		});
	

		rightPhoto.fetch().done(function() {
			rightPhoto.each(function (photo) {
				new PhotoView({ model: photo });
			})
		});
	},	
})




var Router = new AppRouter;
Backbone.history.start();






///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Router////////////////////////////









	


 
 

  


	











