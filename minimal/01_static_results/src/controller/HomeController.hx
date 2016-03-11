package controller;

using ufront.MVC;

class HomeController extends Controller
{
	/**
		Serves a ViewResult, which reads a template file (usualy html)
		and fill in the variable values provided
	**/
	@:route(GET, "/")
	public function main()
	{
		return new ViewResult({
			title: "Ufront NodeJS Guide",
			message:"Welcome to Ufront!"
		});
	}
	
	/**
		Serves a JsonResult, the Content-Type response header will be set to "application/json"
	**/
	@:route(GET, "/json")
	public function json()
	{
		return new JsonResult({
			title: "Ufront NodeJS Guide",
			message:"Welcome to Ufront!"
		});
	}
	
	/**
		Serves a RedirectResult, which redirect the client to another path
	**/
	@:route(GET, "/redirect")
	public function redirect()
	{
		return new RedirectResult("/");
	}
	
	/**
		Serves a FilePathResult, which read a file at the path specified and return it.
		One can optionally specify the mime type and download file name.
	**/
	@:route(GET, "/file")
	public function file()
	{
		return new FilePathResult("package.json");
	}
}