// server/chatters.js
Meteor.publish("chatters", function () {
	return Meteor.users.find({}, {fields: {username: 1, active: 1}});
});

