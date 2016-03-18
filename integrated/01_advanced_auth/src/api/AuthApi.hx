package api;

import auth.Auth;
import model.User;
import js.npm.JsonWebToken;

using ufront.MVC;
using tink.CoreApi;

class AuthApi extends UFApi
{
	static inline var SECRET = @:privateAccess auth.AuthMiddleware.SECRET;
	
	// inject our database manager
	@inject
	public var userManager:UserManager;
	
	// inject the http context so that we can write a cookie later
	@inject
	public var context:HttpContext;
	
	public function login(username:String, password:String):Surprise<Noise, Error>
	{
		// database call is async, we use a future to handle it
		var trigger = Future.trigger();
		
		// find the user in database
		userManager.findOne({username: username}, function(err, user) trigger.trigger(err == null ? Success(user) : Failure(Error.withData('Mongo Error', err))));
		
		// check the credentials when the user data is fetched from database
		return trigger.asFuture() >>
			function(user:User)
			{
				// invalid username
				if(user == null) return new Error("User not found").asBadSurprise();
				
				// incorrect password
				if(password != user.password) return new Error("Incorrect password").asBadSurprise();
				
				// cast the auth interface into our implementation
				var authImplementation = Std.instance(auth, Auth);
				
				// initialize our auth handler
				authImplementation.init(username);
				
				// let the browser store the json web token as cookie
				// so that in the next request we can pick it up in the middleware,
				// in order to persist the login status
				var token = JsonWebToken.sign({username: username}, SECRET, {expiresIn: '30m'});
				context.response.setCookie(new HttpCookie("access_token", token, Date.fromTime(Date.now().getTime() + 30 * 60 * 1000), null, "/"));
				return SurpriseTools.success();
			}
	}
}