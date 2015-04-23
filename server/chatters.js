// server/chatters.js

Meteor.publish("chatters", function () {
	return Chatters.find({});
});

