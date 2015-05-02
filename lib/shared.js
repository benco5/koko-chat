// lib/shared.js
if (Meteor.isServer) {
	Meteor.methods({
		addMessage: function (text) {
			if ( ! Meteor.userId()) {
				throw new Meteor.Error("not-authorized");
			}

			if ( text === "" ) {
				throw new Meteor.Error("missing text");
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
};