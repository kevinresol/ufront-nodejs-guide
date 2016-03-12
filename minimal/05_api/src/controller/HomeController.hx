package controller;

import api.*;

using ufront.MVC;

class HomeController extends Controller
{
	// inject our api (please read docs of the minject library)
	@inject
	public var fileApi:FileApi;
	
	@inject
	public var anotherApi:AnotherApi;
	
	/**
		Call the API and return the value
	**/
	@:route(GET, "/")
	public function main()
	{
		return fileApi.getFile('package.json') >>
			function(content:String) return new ViewResult({
				title: "Ufront NodeJS Guide",
				message: content,
			});
	}
	
	/**
		For demonstration of API referring to another
	**/
	@:route(GET, "/test")
	@template('main.html') // specify the template file, otherwise ufront by default will try to find 'test.html'
	public function test()
	{
		return anotherApi.doSomething() >>
			function(content:String) return new ViewResult({
				title: "Ufront NodeJS Guide",
				message: content,
			});
	}
		
}