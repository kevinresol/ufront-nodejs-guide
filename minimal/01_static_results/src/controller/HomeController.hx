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
	
	/**
		Advanced:
		The above examples return a result in a sync manner. However, in many cases,
		(especially on nodejs) server cannot return immediately due to heavy tasks,
		network latency, etc. So, in order to return an async result, we can return a 
		Future or Surprise of a result. To learn more about Future/Surprise, please 
		read the doc of the tink_core library.
	**/
	@:route(GET, "/async")
	public function async()
	{
		return Future.sync("Welcome to Ufront! (Async)") >>
			function(message:String) return new ViewResult({
				title: "Ufront NodeJS Guide",
				message: message,
			});
	}
	
}