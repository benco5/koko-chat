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
		activateChatter: function () {
			if ( ! Meteor.userId()) {
				throw new Meteor.Error("not-authorized");
			}
			Meteor.users.update( Meteor.userId(), { $set: { active: true } });

		},
		deactivateChatter: function(activeChatterId) {
			if (Meteor.userId()) {
				throw new Meteor.Error("not-authorized");
			}

			Meteor.users.update( activeChatterId, { $set: { active: false } });
		}
	});
};