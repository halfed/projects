/*global Backbone, jQuery, _, ENTER_KEY */
var listApp = listApp || {};

// The Application
// ---------------

// Our overall **ListView** is the top-level piece of UI.
listApp.ListView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML. 
    el: '#listapp',

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click #new-entry': 'createOnEnter'
    },

    // At initialization we bind to the relevant events on the 'ClassLists'
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting lists that might be saved in *localStorage*.
    initialize: function () {
        this.$input1 = this.$('#name');
        this.$input2 = this.$('#grade');
        this.listenTo(listApp.lists, 'add', this.addOne);
        //this.listenTo(listApp.lists, 'reset', this.addAll);
        listApp.lists.fetch();
    },

    // Add a single list item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (student) {
        var view = new listApp.StudentView({ model: student });
        $('#class-list').append(view.render().el);
        view.calcGradeAvg();
    },

    /*addAll: function () {
	    this.$('#class-list').html('');
	    listApp.lists.each(this.addOne, this);
    },*/

    // Generate the attributes for a new List item.
    newAttributes: function () {
        return {
            name: this.$input1.val().trim(),
            grade: this.$input2.val().trim()
        };

    },

    // If you hit return in the main input field, create new **List** model,
    // persisting it to *localStorage*.
    createOnEnter: function (e) {
		var validName;
		var validGrade;
		var testName = /^[A-z]+$/;
		var testGrade = /^\d{2,3}$/;
		validName = testName.test(this.$input1.val())
		validGrade = testGrade.test(this.$input2.val())
		//At this time I'm using a simple alert to validate name and grade.  At this time for this project I'm using
		//this until I can see if maybe jQuery validation plugin can play well with backbone.
		if(this.$input1.val() == '' || validName == false){
			alert('Please enter a valid name');
			return;
		}
		if(this.$input2.val() == '' || validGrade == false){
			alert('Please enter a valid grade');
			return;
		}
        if (e.which !== MOUSE_LISTENER) {
            return;
        }
        listApp.lists.create(this.newAttributes());
        this.$input1.val('');
        this.$input2.val('');
    },
	
	
});