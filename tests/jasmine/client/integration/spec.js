// Practice test 
describe('User signup', function() {

    function signUp (user) {
        $('.dropdown-toggle').trigger('click');
        $('#signup-link').trigger('click');
        $('#login-username').val(user.username);
        $('#login-password').val(user.password);
        $('#login-password-again').val(user.password);
        $('#login-buttons-password').trigger('click');
    }

    var user = { username: 'larry', password: 'password' };

    it('should increase users by one', function (done) {
        Meteor.call("clearDB", done);

        Meteor.call("usersCount", function(error, userCountBefore) {
            signUp(user);
            Meteor.call("usersCount", function (error, userCountAfter) {
                expect(userCountAfter).toEqual(userCountBefore + 1);
                done();
            });
        });
    });

});

describe('User logging in', function(done) {

    Meteor.call("clearDB", done);

    it('should start from welcome page', function (done) {
        if (Meteor.userId()) Meteor.logout();
        Meteor.call("clearDB", function() {
            expect($('h1.main-title-heading').text()).toEqual('Welcome to Koko Chat');
            done();
        });
    });

    it('chatter count should be zero before login', function (done) {
        Meteor.call("chattersCount", function(error, beforeCount) {
            expect(beforeCount).toEqual(0);
            done();
        });
    });

    var user = { username: 'harold', password: 'password' };

    it('should login a user', function (done) {
        Meteor.call("loadFixtures", user, function() {
            Meteor.loginWithPassword(user.username, user.password, function() {
                expect(Meteor.user().username).toEqual(user.username);
                done();
            });
        });
    });

    it('should increment chatter count', function (done) {
        Meteor.call("chattersCount", function(error, afterCount) {
            console.log("after chatters count = " + afterCount.toString());
            expect(afterCount).toEqual(1);
            done();
        });
    });
});


// Async related info:
// For future reference as alternate to nesting methods (below):
// https://github.com/caolan/async  (see commented example at end of file)
// https://atmospherejs.com/peerlibrary/async
// http://www.html5rocks.com/en/tutorials/es6/promises/

// it('should increase users by one', function (done) {
//      var userCountBefore;
//      var userCountAfter;

//      async.series([
//        function (callback) {
//           Meteor.call("usersCount", function (error, count) {
//             userCountBefore = count;
//            callback();
//           });
//        },
//        function (callback) {
//           signUp(user, callback);
//        },
//        function (callback) {
//          Meteor.call("usersCount", function (error, count) {
//             userCountAfter = count;
//             callback();
//          });
//        }  
//      ],
//      function () {
//         expect(userCountAfter).toEqual(userCountBefore + 1);
//         done();
//      });
//  });