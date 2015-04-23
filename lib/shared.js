// lib/shared.js

Meteor.methods({
	addMessage: function (text) {
		if ( ! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Messages.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		})
	},
	addChatter: function () {
		if ( ! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		
		Chatters.insert({
			userId: Meteor.userId(),
			username: Meteor.user().username
		})
	},
	removeChatter: function(chatter) {
		Chatters.remove({
			userId: chatter
		})
	}
});

