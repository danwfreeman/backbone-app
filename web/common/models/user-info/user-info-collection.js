/**
 * Ordered collection of login info, billing info, shipping info, or any subset of
 */

define(
['jquery', 'underscore', 'backbone', '../../../common/models/user-info/user-info-model'],

function($, _, Backbone, UserInfo) {

	var UserInfoCollection = Backbone.Collection.extend({
		model: UserInfo,
		url: "user_info/",

    sync: function(method, collection, options) {
      Backbone.sync(method, collection, options);
    }


	});

	return UserInfoCollection;
});