package api;

using ufront.MVC;
using tink.CoreApi;

/** Just to demonstrate that we can reference another API **/
class AnotherApi extends UFApi
{
	// inject the api we need
	@inject
	public var fileApi:FileApi;
	
	public function doSomething():Surprise<String, Error>
	{
		return fileApi.getFile('package.json');
	}
}