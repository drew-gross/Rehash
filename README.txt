Hi Tom,

I finished getting the usernames, sorted photos from multiple users, and caption text. Thats it though.

If you want to use a variable from one template in a different template, you need to expose it to that template.

	Template.images.usernames = function() {

becomes

	Template.signup.usernames = function() {

if you want to use the usernames variable in the signup template. (from rehash.js)