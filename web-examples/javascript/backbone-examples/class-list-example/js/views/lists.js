/*global Backbone, jQuery, _, ENTER_KEY */
var listApp = listApp || {};

// List Item View
// --------------

// The DOM element for a student list item
listApp.StudentView = Backbone.View.extend({

    tagName: 'li',

    // Cache the template function for a single student.
    template: _.template($('#list-template').html()),

    events: {
        'blur .edit-grade': 'close',
		'click .remove': 'removeStudent'
    },

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
    },
	
    // Re-render the titles of the student item.
    render: function () {
		
		var studentGrade = parseInt(this.model.get('grade'));
		if(studentGrade < 65){
	       this.$el.addClass("failing");
        }
        this.$el.html(this.template(this.model.toJSON()));
        this.$gradeInput = this.$('.edit-grade');
        return this;
    },

    //Calculate the min, max, and average of a student's grade and display it too.
    calcGradeAvg: function () {
		var allGrades = new Array();
		var largest;
		var smallest;
		var avgScore;
        var numGrades
        var gradeTotal = 0;
        var intGrade;
		var res;
		res = $.parseJSON(JSON.stringify(listApp.lists));
        $.each(res, function (key, value) {
            $.each(this, function (j, val) {
				if(j == 'grade'){
					intGrade = parseInt(this);
					allGrades.push(intGrade);
					gradeTotal += intGrade;
			    }
            });
        });
		largest = Math.max.apply(Math, allGrades);
		smallest = Math.min.apply(Math, allGrades);
        avgScore = gradeTotal/res.length;
		avgScore = avgScore.toFixed(1);
       $('#results span').html(avgScore);
	   $('#min span').html(smallest);
	   $('#max span').html(largest);
	},
	
	//Update the current grade of a student in the list
    close: function (student) {
        var newGrade = this.$gradeInput.val().trim();
        if (newGrade) {
            this.model.save({ grade: newGrade });
			if(newGrade < 65){
				this.$el.addClass("failing");
			}
			else {
				this.$el.removeClass("failing");
			}
			this.calcGradeAvg();
        } else {
            this.clear();
        }
    },
	
	//Remove a current student in the list
	removeStudent: function () {
		this.model.toggle();
	    _.invoke(listApp.lists.completed(), 'destroy');
		this.calcGradeAvg();
        return;
    }

});