package controller;

using ufront.MVC;

class HomeController extends Controller
{
	/**
		Main page
	**/
	@:route(GET, "/")
	public function main()
	{
		return new ViewResult({
			title: "Ufront NodeJS Guide",
		});
	}
	
	/**
		GET parameters
	**/
	@:route(GET, "/get")
	public function get(args:{param1:String, param2:Int})
	{
		return new JsonResult({
			param1: args.param1,
			param2: args.param2,
		});
	}
	
	/**
		POST paramters
	**/
	@:route(POST, "/post")
	public function post(args:{param1:String, param2:Int})
	{
		return new JsonResult({
			param1: args.param1,
			param2: args.param2,
		});
	}
	
	/**
		You can also put the parameters as part of the url
	**/
	@:route(GET, "/path/$param1/$param2")
	public function path(param1:String, param2:Int)
	{
		return new JsonResult({
			param1: param1,
			param2: param2,
		});
	}
	
	/**
		You can mix path paramters and query parameters
	**/
	@:route(GET, "/mixed/$param1")
	public function mixed(param1:String, args:{param2:Int})
	{
		return new JsonResult({
			param1: param1,
			param2: args.param2,
		});
	}
	
}