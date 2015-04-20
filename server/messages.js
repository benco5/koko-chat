// server/messages.js

Meteor.publish("messages", function () {
	return Messages.find({});
});

