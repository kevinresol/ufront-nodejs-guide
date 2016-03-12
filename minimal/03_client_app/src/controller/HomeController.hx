package controller;

using ufront.MVC;

class HomeController extends Controller
{
	/**
		Serves a main page
	**/
	@:route(GET, "/")
	public function main()
	{
		return new ViewResult({
			title: "Ufront NodeJS Guide - Home",
			message:"Welcome to Ufront!"
		});
	}
	
	/**
		Serves another page
	**/
	@:route(GET, "/about")
	public function about()
	{
		return new ViewResult({
			title: "Ufront NodeJS Guide - About",
		});
	}
}