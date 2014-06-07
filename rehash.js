if (Meteor.isClient) {
  var IGintialized = false;
  Parse.initialize("TCDWY9Ruvug1bsl3WAAgD6dLyU6UbjVgzUOKw6P6", "GEWCWsdk8J9gcw3gOpYlt412Nmv1hFbxCV5raw0m");
  Template.signup.rendered = function () {
    if (!IGintialized) {
      IG.init({
        client_id:"e1a7b079c2514cdab8fd86519a931b10",
        check_status: true,
        cookie: true
      });
      IGintialized = true;
    }
  };
  Template.signup.events({
    'click #signup' : function () {
      var user = new Parse.User()
      user.set("username", $("#username").val());
      user.set("password", $("#password").val());
      user.signUp(null, {
        success: function(user) {
        },
        error: function(user, error) {
          alert(error.message);
          $("#error").text(error.message);
        }
      });
    },
    'click #test' : function () {
      console.log(IG);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
