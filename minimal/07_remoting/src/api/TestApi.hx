package api;

using ufront.MVC;
using tink.CoreApi;

class TestApi extends UFApi
{
	public function test(param:String):Surprise<String, Error>
	{
		// make sure this piece of code is compiled in the server only
		// to demonstrate that the code is actually run in the server,
		// even when the API is called form client
#if server
		param = '$param (server)';
#end
		
		// just shorthand to `Future.sync(Success(param))`
		return param.asGoodSurprise();
	}
}


// UFAsyncApi will do the magic, converting all the api calls to remoting calls for the client
class AsyncTestApi extends UFAsyncApi<TestApi> {}