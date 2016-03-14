package controller;

import api.TestApi;

using ufront.MVC;

class HomeController extends Controller
{
	@inject
	public var testApi:AsyncTestApi;
	
	@:route(GET, "/")
	public function main(?args:{param:String})
	{
		return testApi.test(args.param) >>
			function(result:String) return new ViewResult({
				title: "Ufront NodeJS Guide - Home",
				message: 'Result: $result', // print the result of the API call
				renderedBy: #if server 'Server' #else 'Client' #end, // let us know if this page is rendered by client or server
			});
	}
}