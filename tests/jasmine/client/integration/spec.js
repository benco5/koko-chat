// Control test to make sure Velocity and Jasmine are happy
describe('body', function () {
    it('shows heading "Welcome to Koko Chat"', function() {
        expect($('h1.main-title-heading').text()).toEqual('Welcome to Koko Chat');
    })
});

// New user signup
function signUp (user, callback) {
    $('.dropdown-toggle').trigger('click');
    $('#signup-link').trigger('click');
    $('#login-username').val(user.username);
    $('#login-password').val(user.password);
    $('#login-password-again').val(user.password);
    $('#login-buttons-password').trigger('click');
    return callback;
}

describe('User signup', function() {

    // Meteor.subscribe("users");

    var user = { username: 'larry', password: 'password' };

    beforeEach(function(done) {
        Meteor.call("clearDB", done);
    });

    // For future reference as alternate to nesting methods (below):
    // https://github.com/caolan/async  (see commented example at end of file)
    // https://atmospherejs.com/peerlibrary/async
    // http://www.html5rocks.com/en/tutorials/es6/promises/
    it('should increase users by one', function (done) {
        Meteor.call("usersCount", function(error, userCountBefore) {
            signUp(user);
            Meteor.call("usersCount", function (error, userCountAfter) {
                expect(userCountAfter).toEqual(userCountBefore + 1);
                done();
            });
        });
    });

    it('should automatically log-in new user', function () {
        expect(Meteor.user().username).toEqual(user.username);
    });
});

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