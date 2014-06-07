if (Meteor.isClient) {
  var IGintialized = false;
  var images = [];
  Parse.initialize("TCDWY9Ruvug1bsl3WAAgD6dLyU6UbjVgzUOKw6P6", "GEWCWsdk8J9gcw3gOpYlt412Nmv1hFbxCV5raw0m");
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
      console.log("loading");
      Meteor.call("checkInstagram", function(error, results) {
        Session.set("images", JSON.parse(results.content).data);
        console.log(JSON.parse(results.content).data);
      });
    }
  });

  Template.images.images = function() {
    return _.pluck(_.pluck(Session.get("images"), "images"), "standard_resolution");
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    checkInstagram: function () {
      this.unblock();
      return Meteor.http.call("GET", "https://api.instagram.com/v1/media/popular?client_id=e1a7b079c2514cdab8fd86519a931b10");
    }
  });
}
