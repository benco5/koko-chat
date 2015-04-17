// client/main.js

Meteor.subscribe("messages");
// Help the template; not necessarily user event / input
Template.body.helpers({
	// Seems to be like RoR controller index action
	messages: function () {
		return Messages.find({});
	}
});

// Handle some event
Template.body.events({
	// On submit event with class of new-message
	"submit .new-message": function (event) {
		// Event target = form element; assign text's value
		var text = event.target.text.value;

		Meteor.call("addMessage", text);

		event.target.text.value = "";

		// Prevent default form submit ...?
		return false;
	}
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});