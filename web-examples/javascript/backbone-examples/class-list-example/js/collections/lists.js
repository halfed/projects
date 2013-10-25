/*global Backbone */
var listApp = listApp || {};

// Class List Collection
// ---------------

// The collection of lists is backed by *localStorage* instead of a remote
// server.
var ClassList = Backbone.Collection.extend({
// Reference to this list's model.
model: listApp.List,

// Filter down the list of all students that need to be removed.
completed: function () {
return this.filter(function (list) {
console.log('list is '+ JSON.stringify(list));
return list.get('remove');
});
},

// Save all of the list items under the "lists" namespace.
localStorage: new Backbone.LocalStorage('lists-backbone'),

});

// Create our global collection of classList.
listApp.lists = new ClassList();

