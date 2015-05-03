// client/main.js
Meteor.startup(function () {
	Accounts.ui.config({
	    passwordSignupFields: "USERNAME_ONLY"
	});
});

// Chatters are just a subset of Meteor.users
// filtered for { active: true } property
Meteor.subscribe("chatters");
Meteor.subscribe("messages");


// Help a template
Template.body.helpers({
	messages: function () {
		return Messages.find();
	},
	chatters: function () {
		return Meteor.users.find();
	},
	currentChattersCount: function () {
		return Meteor.users.find({active: true}).count();
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
	},
	"click #remote-signin-toggle": function (event) {
		// Second button to toggle signin/up dropdown
		if (!Meteor.userId()) {
			$('#login-dropdown-list.dropdown').toggleClass('open');
		}
		return false;
	}
});

Tracker.autorun(function (c) {
	if (Meteor.userId()) {
		var count = Messages.find().count();
		if (c.firstRun) {
			return
		}
		if (document.body && count) {
			var messages = document.body.getElementsByClassName('message');
			var len = messages.length;
			var lastMessage = messages[len-1];
			lastMessage.scrollIntoView();
		}
	};
})
Tracker.flush();

// The following two autoruns watch for user login/logout and
// make calls to modify active chatters accordingly
Tracker.autorun(function (c) {
	// If Meteor.user just logged in, set them as active
	if (Meteor.userId() && !Session.get("activeChatterId")) {
		Session.setPersistent("activeChatterId", Meteor.userId());
		Meteor.call("activateChatter", function() {
		});
	};
	var chatterCount = Meteor.users.find({active: true}).count();
	console.log("Chatters count " + chatterCount.toString());
})
Tracker.flush();

Tracker.autorun(function (c) {
	// If Meteor.user has just logged out, set them as inactive
	if (!Meteor.userId() && Session.get("activeChatterId")) {
		Meteor.call("deactivateChatter", Session.get("activeChatterId"));
		Session.setPersistent("activeChatterId", null);
	};
	var chatterCount = Meteor.users.find({active: true}).count();
	console.log("Chatters count " + chatterCount.toString());
})
Tracker.flush();


