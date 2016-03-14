package controller;

import api.*;

using ufront.MVC;

class HomeController extends Controller
{
	@inject
	public var authApi:AuthApi;
	
	@:route(GET, "/")
	public function main(?args:{username:String, password:String})
	{
		// try to login with the provided credentials
		// there is no problem if they are not provided,
		// the api will simply skip the process.
		return authApi.login(args.username, args.password) >>
			function(_)
			{
				// we can access the auth handler from `context.auth`
				var isLoggedIn = context.auth.isLoggedIn();
				
				return new ViewResult({
					title: "Ufront NodeJS Guide",
					isLoggedIn: isLoggedIn,
				});
			}
			
	}
	
}