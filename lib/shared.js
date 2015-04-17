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
	}
});