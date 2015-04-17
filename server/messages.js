// server/main.js

Meteor.publish("messages", function () {
	return Messages.find({});
});

