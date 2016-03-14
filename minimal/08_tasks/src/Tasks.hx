package;

import api.*;
import ufront.tasks.UFTaskSet;

using ufront.MVC;
using tink.CoreApi;

class Tasks extends UFTaskSet
{
	static function main()
	{
		var tasks = new Tasks();
		
		// Inject our content directory in case we need to write to it.
		tasks.injector.map(String, "contentDirectory").toValue("../uf-content/");
		
		// Inject the auth system if you need auth in your APIs.
		// tasks.injector.map(UFAuthHandler).toClass(YesBossAuthAHandler);
		
		// Inject all our APIs.
		for (api in CompileTime.getAllClasses(UFApi)) tasks.injector.mapRuntimeTypeOf(api).toSingleton(api);
		
		// Use CLI logging, which prints both to a log file and to the CLI output.
		tasks.useCLILogging("logs/tasks.log");

		// Execute the task runner
		var args = Sys.args();
		tasks.execute(args);
		
	}
	
	// inject our API
	@inject @:skip
	public var fileApi:FileApi;
	
	/**
		A demonstration to show that you can call an API from a task script.
		
		Usage: node tasks.js --test
	**/
	public function test()
	{
		// You can call any API from a task script
		fileApi.getFile('package.json').handle(
			function(content)
			{
				trace(content.sure());
				Sys.exit(0);
			}
		);
	}
	
	/**
		A demonstration to show that you can pass parameters to task script.
		(Refer to mcli docs for more details.)
		
		Usage: node tasks.js --read-path package.json
	**/
	public function readPath(path:String)
	{
		// You can call any API from a task script
		fileApi.getFile(path).handle(
			function(content)
			{
				trace(content.sure());
				Sys.exit(0);
			}
		);
	}
}