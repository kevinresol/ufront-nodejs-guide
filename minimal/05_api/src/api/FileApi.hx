package api;

import sys.io.File;
import haxe.Timer;

using ufront.MVC;
using tink.CoreApi;

class FileApi extends UFApi
{
	public function getFile(path:String):Surprise<String, Error>
	{
		var content = File.getContent(path);
		
		// the file is read immediately, but we want to simulate an async call,
		// so we delay to return the result for 1sec (1000ms)
		// read docs of tink_core library to learn how Future/Surprise works
		var trigger = Future.trigger();
		Timer.delay(function() trigger.trigger(Success(content)), 1000);
		return trigger;
	}
}