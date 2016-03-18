package model;

import js.npm.mongoose.Mongoose;
import model.User;

class Managers 
{
	public static function init(injector:minject.Injector)
	{
		// connect to mongodb
		var mongoose = new Mongoose();
		mongoose.connect("mongodb://localhost/01_advanced_auth");
		
		// init our database manager
		var userManager = UserManager.build(mongoose, "User");
		
		// inject our user manager
		injector.map(UserManager).toValue(userManager);
	}
}