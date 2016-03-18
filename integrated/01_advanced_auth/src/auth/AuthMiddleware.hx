package auth;

import haxe.Json;
import js.npm.JsonWebToken;
import auth.Auth;

using ufront.MVC;
using tink.CoreApi;

class AuthMiddleware implements UFRequestMiddleware 
{
	#if server // make sure our secret is not leaked to client
	static inline var SECRET = 'our-jwt-secret';
	#end
	
	public function new() {}

	/**
		This function will be run when a request arrives, before it is handled by controllers.
		We look for a access token in the request and use it to identify the user.
		If an user is identified we initiate our auth handler, so that later when a controller
		handles this request, it can use `context.auth` to find out the auth-related information.
	**/
	public function requestIn( ctx:HttpContext ):Surprise<Noise,Error> 
	{
		// try to fetch the access token from cookies or post/get params
		var token = ctx.request.params['access_token'];

		if (token != null) 
		{
			// try to decode the token
			var payload = 
				try
					JsonWebToken.verify(token, SECRET)
				catch(e:js.Error)
					// there are some problem with the token, let's skip the following process
					return SurpriseTools.success();
			
			// refresh the token to make it not to expire in the next 30 minutes
			// this is done through 
			// - setting the expiry of the token (encoded in jwt), and;
			// - setting the expiry of the cookie
			var refreshedToken = JsonWebToken.sign(payload, SECRET, {expiresIn: '30m'});
			ctx.response.setCookie(new HttpCookie("access_token", refreshedToken, Date.fromTime(Date.now().getTime() + 30 * 60 * 1000), null, "/"));
			
			// init our auth handler
			var auth:Auth = cast ctx.auth;
			auth.init(payload.username);
		}
		
		return SurpriseTools.success();
	}
}