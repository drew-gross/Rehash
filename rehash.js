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
      Meteor.call("checkInstagram", $("#name").val(), function(error, results) {
        console.log(results);
        Session.set("images", results);
      });
    }
  });

  Template.images.images = function() {
    return _.pluck(_.pluck(Session.get("images"), "images"), "standard_resolution");
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    checkInstagram: function (names) {
      this.unblock();
      var split_names = names.split(" ");
      var people_ids = [];
      for (i = 0; i < split_names.length; i++) {
        var name = split_names[i];
        var result = Meteor.http.call("GET", "https://api.instagram.com/v1/users/search?q="+name+"&client_id=e1a7b079c2514cdab8fd86519a931b10&count=1");
        var people_data = JSON.parse(result.content).data;
        if (people_data[0]) {
          people_ids.push(people_data[0].id);
        }
      }
      var photos = [];
      for (i = 0; i < people_ids.length; i++) {
        var result = Meteor.http.call("GET", "https://api.instagram.com/v1/users/"+people_ids[i]+"/media/recent/?client_id=e1a7b079c2514cdab8fd86519a931b10");
        var media_ids = JSON.parse(result.content).data;
        photos = photos.concat(media_ids);
      }
      return photos;
    }
  });
}
