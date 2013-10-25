/*global Backbone */
var listApp = listApp || {};

// List Model
// ----------

// Model contains student name, grade and if failing.
listApp.List = Backbone.Model.extend({
    // Default attributes for the class List
    // and ensure that each person created has 'name', 'grade', and 'failing' keys.
    defaults: {
        name: '',
        grade: 100,
        avgGrade: 50,
        remove: false
    },

    // Toggle the `completed` state of this list item.
    toggle: function () {
        this.save({
            remove: !this.get('remove')
        });
    }
});