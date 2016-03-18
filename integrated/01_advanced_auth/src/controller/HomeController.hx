package controller;

import api.AuthApi;

using ufront.MVC;

class HomeController extends Controller
{
	@inject
	public var authApi:AuthApi;
	
	@:route(GET, "/")
	public function main()
	{
		var isLoggedIn = context.auth.isLoggedIn();
		
		return new ViewResult({
			title: "Ufront NodeJS Guide",
			isLoggedIn: isLoggedIn,
		});
	}
	
	@:route(POST, "/login")
	public function login(args:{username:String, password:String})
	{
		// try to login and redirect back to home page if success
		return authApi.login(args.username, args.password) >>
			function(_) return new RedirectResult('/');
	}
	
	@:route(POST, "/logout")
	public function logout()
	{
		// clear the access_token cookie in user's browser
		context.response.setCookie(new HttpCookie("access_token", '', Date.now(), null, "/"));
		
		// redirect back to home page
		return new RedirectResult('/');
	}
}